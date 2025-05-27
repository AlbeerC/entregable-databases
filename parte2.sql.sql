
/* 1. Crea una tabla llamada empleados con los campos id, nombre, edad y salario */
CREATE TABLE IF NOT EXISTS empleados (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad TINYINT UNSIGNED NOT NULL,
    salario DECIMAL(10,2) NOT NULL
);


/* 2. Inserta 3 registros en la tabla empleados. */
INSERT INTO empleados (nombre, edad, salario) VALUES
("Robert Plant", 30, 150000),
("Ozzy Osbourne", 45, 80000),
("Jim Morrison", 27, 45000),
("Ronnie James Dio", 60, 62000),
("Axl Rose", 22, 95000);


/* 3. Escribe una consulta para obtener todos los empleados con un salario mayor a    
50000. */
SELECT * FROM empleados WHERE salario > 50000;


/* 4. Escribe una consulta para actualizar la edad de un empleado con id = 2 */
UPDATE empleados SET edad = 46 WHERE id = 2;


/* 5. Escribe una consulta para eliminar un empleado con id = 3 */
DELETE FROM empleados WHERE id = 3;


/* 6. Escribe una consulta que cuente cuántos empleados hay en la tabla. */
SELECT COUNT(*) AS empleados_totales FROM empleados;


/* 7. Escribe una consulta que seleccione sólo los empleados cuyo nombre empiece con 
"A". */
SELECT * FROM empleados WHERE nombre LIKE 'A%';


/* 8. Crea una tabla departamentos con los campos id, nombre y ubicación. */
CREATE TABLE IF NOT EXISTS departamentos (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL
);	


/* 9. Agrega una clave foránea a la tabla empleados referenciando departamentos(id). */
ALTER TABLE empleados ADD COLUMN departamento_id INT UNSIGNED;


ALTER TABLE empleados 
ADD CONSTRAINT fk_departamento 
FOREIGN KEY (departamento_id)
REFERENCES departamentos(id);


/* Creo los departamentos en la tabla */
INSERT INTO departamentos (nombre, ubicacion) VALUES
  ('Recursos Humanos', 'Edificio A'),
  ('Desarrollo', 'Edificio B'),
  ('Ventas', 'Edificio C');
  
  
/* Asigno un departamento a cada empleado */
UPDATE empleados SET departamento_id = 1 WHERE id = 1;
UPDATE empleados SET departamento_id = 2 WHERE id = 2;
UPDATE empleados SET departamento_id = 3 WHERE id = 4;
UPDATE empleados SET departamento_id = 2 WHERE id = 5;


/* 10. Escribe una consulta para obtener el salario promedio de los empleados por 
departamento */
SELECT d.nombre AS departamento, ROUND(AVG(e.salario), 2) AS salario_promedio
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
GROUP BY d.nombre;


/* 11. Escribe una consulta para buscar empleados con edad entre 25 y 40 años. */
SELECT e.nombre, e.edad 
FROM empleados AS e 
WHERE e.edad >= 25 && e.edad <= 40;


/* 12.Escribe una consulta que devuelva los 3 empleados con mejor salario */
SELECT e.nombre, e.salario
FROM empleados AS e
ORDER BY e.salario DESC
LIMIT 3;