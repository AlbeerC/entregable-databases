/* Creo tabla clientes */
CREATE TABLE IF NOT EXISTS clientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL
);

/* Creo tabla pedidos usando el id del cliente como foreign key (1:N) */
CREATE TABLE IF NOT EXISTS pedidos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10, 2),
    cliente_id INT UNSIGNED,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);


INSERT INTO clientes (nombre, email) VALUES
("Juan", "juan@example.com"),
("Maria", "maria@example.com");

/* Inserto un pedido más que la consigna para comprobar si funciona el caso 1:N */
INSERT INTO pedidos (total, cliente_id) VALUES
(100.50, 1),
(200.75, 2),
(150.25, 1);


SELECT c.id AS cliente_id, c.nombre, c.email, p.id AS pedido_id, p.total
FROM clientes c
JOIN pedidos p ON p.cliente_id = c.id;