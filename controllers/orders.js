import { OrderServices } from "../Services/orders.js";

export const createOrder = async (req, res) => {
  try {
    const body = {
      ...req.body,
    };
    const data = await OrderServices.createOrder(body);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderServices.getOrderById(id);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
export const updateOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = {
      ...req.body,
    };
    const data = await OrderServices.updateOrderById(id, body);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderServices.deleteOrder(id);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
export const getTotalSales = async (req, res) => {
  try {
    const data = await OrderServices.getTotalSales();
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};

export const getTotalOrders = async (req, res) => {
  try {
    const data = await OrderServices.getTotalOrders();
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
export const getOrdersHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderServices.getOrdersHistory(id);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
