SELECT * FROM products;

SELECT * FROM categories;



/*llama en la BD todos los productos y categorías con ID*/

SELECT "categoryId", c.name, "productId", p.name FROM "productCategory" 
JOIN categories as c ON c.id = "categoryId"
JOIN products as p on p.id = "productId"
ORDER BY c.id;



/* INSERTAR VALORES A TABLA productCategory - VINCULTAR PRODUCTO CON CATEGORIA */

INSERT INTO "productCategory" ("productId","categoryId")
VALUES (1,3), (2,2), (4,1), (5,1), (5,2), (6,2), (7,4), (7,1); --INSERTO VALORES HARDCODEADOS A LA BD



--Categorias x id
-- Scooters = 1
-- Skates = 2
-- Windsurf = 3
-- Bikes = 4
