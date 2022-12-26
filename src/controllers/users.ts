import { UsersModel } from '../models/users';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyAuthToken';
import { Application, Request, Response } from 'express';

const users = new UsersModel();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await users.getAllUsers();
    res.send(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;
    const createdUser = await users.createUser(firstName, lastName, password);
    const token = jwt.sign(createdUser, process.env.TOKEN_SECRET as string);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserbyId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await users.getUserbyId(id);
    res.send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedUser = await users.deleteUser(id);
    res.send(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, password } = req.body;
    const updatedUser = await users.updateUser(id, firstName, lastName, password);
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const usersRoutes = (app: Application) => {
  app.get('/users', verifyToken, getAllUsers);
  app.get('/user/:id', verifyToken, getUserbyId);
  app.post('/user', createUser);
  app.put('/user', verifyToken, updateUser);
  app.delete('/user', verifyToken, deleteUser);
};

export default usersRoutes;
