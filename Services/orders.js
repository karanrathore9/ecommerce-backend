import OrderItem from "../models/order-Item.js";
import Order from "../models/order.js";
import { API_RESPONSE_MSG } from "../utils/constants.js";

export class OrderServices {
  static createOrder = async (data) => {
    try {
      const orderItemIds = await Promise.all(
        data.OrderItems.map(async (item) => {
          let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product,
          });
          newOrderItem = await newOrderItem.save();
          return newOrderItem._id;
        }),
      );
      const orderItemsIdsResolved = await orderItemIds;
      console.log(orderItemsIdsResolved);

      const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (id) => {
          const orderItem = await OrderItem.findById(id).populate(
            "product",
            "price",
          );
          const totalPrice = orderItem.product.price * orderItem.quantity;
          return totalPrice;
        }),
      );
      const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

      let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: data.shippingAddress1,
        shippingAddress2: data.shippingAddress2,
        city: data.city,
        zip: data.zip,
        country: data.country,
        phone: data.phone,
        status: data.status,
        totalPrice: totalPrice,
        user: data.user,
      });
      order = await order.save();
      return {
        success: true,
        message: API_RESPONSE_MSG.order_created_successfully,
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getOrderById = async (id) => {
    try {
      const order = await Order.findById(id)
        .populate("user", "name email")
        .populate({
          path: "orderItems",
          populate: {
            path: "product",
            populate: "category",
          },
        });
      return {
        success: true,
        message: API_RESPONSE_MSG.order_details_fetched_successfully,
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getAllOrders = async () => {
   
     try {
       const data = await Order.find().populate("user", "name email");
       return {
         success: true,
         message: API_RESPONSE_MSG.categories_fetched_successfully,
         data: data,
       };
     } catch (error) {
       return {
         success: false,
         message: API_RESPONSE_MSG.failed,
         error: error,
       };
     }
  };

  static updateOrderById = async (data) => {
    try {
      const id = data.id;
      const order = await Order.findByIdAndUpdate(
        id,
        {
          status: data.status,
        },
        { new: true },
      );

      return {
        success: true,
        message: API_RESPONSE_MSG.order_updated_successfully,
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static deleteOrder = async (id) => {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (order) {
        const deleteOrderItems = order.orderItems.map(async (items) => {
          OrderItem.findByIdAndDelete(items);
        });
        await Promise.all(deleteOrderItems);
      }
      return {
        success: true,
        message: API_RESPONSE_MSG.order_deleted_successfully,
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getTotalSales = async () => {
    try {
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

      return {
        success: true,
        message: API_RESPONSE_MSG.total_sales_fetched_successfully,
        data: { totalSales: totalSales.pop().totalSales },
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };
  static getTotalOrders = async () => {
    try {
      const totalOrders = await Order.countDocuments();
      return {
        success: true,
        message: API_RESPONSE_MSG.total_orders_count_fetched_successfully,
        data: { totalOrders: totalOrders },
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };
  static getOrdersHistory = async (id) => {
    try {
      const orders = await Order.find({ user: id })
        .populate({
          path: "orderItems",
          populate: {
            path: "product",
            populate: "category",
          },
        })
        .sort({ dateOrdered: -1 });
      return {
        success: true,
        message: API_RESPONSE_MSG.orders_history_fetched_successfully,
        data: orders,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };
}
