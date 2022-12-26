import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: string;
};

export class ProductsModel {
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the products with the following error: ${error}`
      );
    }
  }
  async createProduct(name: string, price: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO products (name,price) VALUES($1, $2) RETURNING *";
      const result = await connection.query(sql, [name, price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the product with the following error: ${error}`
      );
    }
  }

  async getProductbyId(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the product with the following error: ${error}`
      );
    }
  }
  async deleteProduct(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete product with the following error: ${error}`
      );
    }
  }

  async updateProduct(
    id: number,
    name: string,
    price: string
  ): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        "UPDATE products SET name=($2), price=($3) WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id, name, price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update product with the following error: ${error}`
      );
    }
  }
}
