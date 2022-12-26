import { verifyToken } from "../middlewares/verifyAuthToken";
import { ProductsModel } from "../models/products";
import { Application, Request, Response } from "express";

const products = new ProductsModel();

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const getall = await products.getAllProducts();
    res.send(getall);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const createdProduct = await products.createProduct(name, price);
    res.send(createdProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductbyId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await products.getProductbyId(id);
    res.send(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedProduct = await products.deleteProduct(id);
    res.send(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price } = req.body;
    const updatedProduct = await products.updateProduct(id, name, price);
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const productsRoutes = (app: Application) => {
  app.get("/products", getAllProducts);
  app.get("/product/:id", getProductbyId);
  app.post("/product", verifyToken, createProduct);
  app.put("/product", verifyToken, updateProduct);
  app.delete("/product", verifyToken, deleteProduct);
};

export default productsRoutes;
