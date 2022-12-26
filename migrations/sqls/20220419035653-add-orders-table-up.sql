CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    userId INT REFERENCES users(id)
);