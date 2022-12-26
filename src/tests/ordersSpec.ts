import { OrdersModel } from '../models/orders';
import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const order = new OrdersModel();

const request = supertest(app);

const newUser = {
  firstName: 'first',
  lastName: 'last',
  password: '12345678',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Testing Orders Methods', () => {
  it('A method that get all orders', () => {
    expect(order.getAllOrders).toBeDefined();
  });

  it('A method that get a specific order', () => {
    expect(order.getOrderById).toBeDefined();
  });

  it('A method that create a new order', () => {
    expect(order.createOrder).toBeDefined();
  });
  it('A method that update data of an order', () => {
    expect(order.updateOrder).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(order.deleteOrder).toBeDefined();
  });
});
describe('Testing orders Endpoints.', () => {
  it('GET /orders without a token', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });
  it('GET /orders with a token', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /order/:id without a token ', async () => {
    const response = await request.get('/order/1');
    expect(response.status).toBe(401);
  });
  it('GET /order/:id with a token ', async () => {
    const response = await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('POST /order without a token', async () => {
    const response = await request.post('/order').send({
      status: 'test',
      userId: 1,
    });
    expect(response.status).toBe(401);
  });
  it('POST /order with a token', async () => {
    const response = await request
      .post('/order')
      .send({
        status: 'test',
        userId: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('PUT /order without a token', async () => {
    const response = await request.put('/order').send({
      id: 1,
      status: 'update',
      userId: 1,
    });
    expect(response.status).toBe(401);
  });

  it('PUT /order with a token', async () => {
    const response = await request
      .put('/order')
      .send({
        id: 1,
        status: 'update',
        userId: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('DELETE /order without a token', async () => {
    const response = await request.delete('/order').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('DELETE /order with a token', async () => {
    const response = await request
      .delete('/order')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
