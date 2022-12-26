import { OrdersModel } from "../models/orders";
import { verifyToken } from "../middlewares/verifyAuthToken";
import { Application, Request, Response } from "express";
const orders = new OrdersModel();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const getOrders = await orders.getAllOrders();
    res.send(getOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.body;
    const createdOrder = await orders.createOrder(status, userId);
    res.send(createdOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const order = await orders.getOrderById(id);
    res.send(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await orders.updateOrder(id, status);
    res.send(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedOrder = await orders.deleteOrder(id);
    res.send(deletedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOrderedProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await orders.addOrderedProduct(
      quantity,
      orderId,
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoutes = (app: Application) => {
  app.get("/orders", verifyToken, getAllOrders);
  app.post("/order", verifyToken, createOrder);
  app.get("/order/:id", verifyToken, getOrder);
  app.delete("/order", verifyToken, deleteOrder);
  app.put("/order", verifyToken, updateOrder);
  app.post("/orders/:id/products", verifyToken, addOrderedProduct);
};

export default ordersRoutes;
