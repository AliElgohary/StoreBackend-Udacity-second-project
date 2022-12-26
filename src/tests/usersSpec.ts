import { UsersModel } from '../models/users';
import app from '../server';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

const user = new UsersModel();

const request = supertest(app);

const newUser = {
  firstName: 'first',
  lastName: 'last',
  password: '12345678',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Testing User Methods', () => {
  it('A method that get all users', () => {
    expect(user.getAllUsers).toBeDefined();
  });

  it('A method that get a specific user', () => {
    expect(user.getUserbyId).toBeDefined();
  });

  it('A method that create a new user', () => {
    expect(user.createUser).toBeDefined();
  });
  it('A method that update data of a user', () => {
    expect(user.updateUser).toBeDefined();
  });
  it('A method that delete a user', () => {
    expect(user.updateUser).toBeDefined();
  });
});
describe('Testing Users Endpoints.', () => {
  it('GET /users without token', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('GET /users with token', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /user/:id without token', async () => {
    const response = await request.get('/user/1');
    expect(response.status).toBe(401);
  });

  it('GET /user/:id with token', async () => {
    const response = await request
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('POST /user', async () => {
    const response = await request.post('/user').send({
      firstName: 'first',
      lastName: 'last',
      password: '12345678',
    });
    expect(response.status).toBe(200);
  });

  it('PUT /user without token', async () => {
    const response = await request.put('/user').send({
      id: 1,
      firstName: 'update',
      lastName: 'update',
      password: 'update',
    });
    expect(response.status).toBe(401);
  });

  it('PUT /user with a token', async () => {
    const response = await request
      .put('/user')
      .send({
        id: 1,
        firstName: 'update',
        lastName: 'update',
        password: 'update',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('DELETE /user without token', async () => {
    const response = await request.delete('/user').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });
});
