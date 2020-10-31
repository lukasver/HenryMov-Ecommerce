SELECT * FROM products;

SELECT * FROM categories;



/*llama en la BD todos los productos y categorías con ID*/

SELECT "categoryId", c.name, "productId", p.name FROM "productCategory" 
JOIN categories as c ON c.id = "categoryId"
JOIN products as p on p.id = "productId"
ORDER BY c.id;



/* INSERTAR VALORES A TABLA productCategory - VINCULTAR PRODUCTO CON CATEGORIA */

INSERT INTO "productCategory" ("productId","categoryId")
VALUES (1,3), (2,2),(3,3), (4,1), (5,1), (5,2), (6,2), (7,4), (7,1); --INSERTO VALORES HARDCODEADOS A LA BD



--Categorias x id
-- Scooters = 1
-- Skates = 2
-- Windsurf = 3
-- Bikes = 4

SELECT products.name, orderlines."orderId" FROM products
JOIN orderlines ON products.id = orderlines."productId"
LIMIT 10;

SELECT u.id , u.name, u.lastname, o.id as 'OrderlineId', o.amount, o.quantity, o."orderId", o."productId", p.name, p.availability, p.stock FROM orderlines AS o
JOIN products AS p ON o."productId" = p.id
JOIN orders ON orders.id = o."orderId"
JOIN users AS u ON u.id = orders."userId";


-- JOIN users AS u ON o."orderId" = u.id

-- WHERE o."orderId" = 4
LIMIT 10;


SELECT orders.id as order, p.id, p.name, ol.quantity, ol.amount from orders
JOIN orderlines AS ol on ol."orderId" = orders.id
JOIN products AS p on p.id = ol."productId"
WHERE orders.id = 8
LIMIT 10;


