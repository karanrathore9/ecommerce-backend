import express from "express";
import { ROUTES } from "../utils/constants.js";
import { createOrder, deleteOrder, getAllOrders, getOrderById, getOrdersHistory, getTotalOrders, getTotalSales, updateOrderById } from "../controllers/orders.js";

const orderRouter = express.Router();

orderRouter.post(ROUTES.CREATE_ORDER,createOrder);
orderRouter.get(ROUTES.GET_ORDER_BY_ID,getOrderById);
orderRouter.get(ROUTES.GET_ALL_ORDERS, getAllOrders);
orderRouter.put(ROUTES.UPDATE_ORDER_BY_ID, updateOrderById);
orderRouter.delete(ROUTES.DELETE_ORDER, deleteOrder);
orderRouter.get(ROUTES.GET_TOTAL_SALES, getTotalSales);
orderRouter.get(ROUTES.GET_ORDER_COUNT, getTotalOrders);
orderRouter.get(ROUTES.GET_ORDERS_HISTORY, getOrdersHistory)
export default orderRouter;
