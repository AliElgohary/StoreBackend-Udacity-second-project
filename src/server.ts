import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import usersRoutes from './controllers/users';
import productRoutes from './controllers/products';
import ordersRoutes from './controllers/orders';

const app: Application = express();

app.use(helmet());

app.use(express.json());

const port = process.env.PORT;

app.get('/', async (_req: Request, res: Response) => {
  res.send('Storefront backend APIs');
});

usersRoutes(app);
productRoutes(app);
ordersRoutes(app);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
