import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UsersModel {
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the users with the following error: ${error}`
      );
    }
  }

  async createUser(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (firstName,lastName,password) VALUES($1, $2, $3) RETURNING id, firstName, lastName ';
      const hash = bcrypt.hashSync(
        password + (process.env.BCRYPT_PASSWORD as string),
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await connection.query(sql, [firstName, lastName, hash]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the user with the following error: ${error}`
      );
    }
  }

  async getUserbyId(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the user with the following error: ${error}`
      );
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id, firstName, lastName';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete user with the following error: ${error}`
      );
    }
  }

  async updateUser(
    id: number,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE users SET firstName=($2), lastName=($3), password=($4)  WHERE id=($1) RETURNING id, firstName, lastName';
      const hash = bcrypt.hashSync(
        password + (process.env.BCRYPT_PASSWORD as string),
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await connection.query(sql, [
        id,
        firstName,
        lastName,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update user with the following error: ${error}`
      );
    }
  }


}
