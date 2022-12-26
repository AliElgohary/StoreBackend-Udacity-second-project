import client from "../database";

export type Order = {
  id: number;
  status: string;
  userId: number;
};

export class OrdersModel {
  async getAllOrders(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the orders with the following error: ${error}`
      );
    }
  }

  async createOrder(status: string, userId: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO orders (status,userId) VALUES($1, $2) RETURNING *";
      const result = await connection.query(sql, [status, userId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the order with the following error: ${error}`
      );
    }
  }

  async getOrderById(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE userId=($1)";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the order with the following error: ${error}`
      );
    }
  }

  async updateOrder(id: number, status: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id, status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update order with the following error: ${error}`
      );
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete order with the following error: ${error}`
      );
    }
  }

  async addOrderedProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders_products (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [
        quantity,
        orderId,
        productId,
      ]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
