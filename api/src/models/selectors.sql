SELECT p.id, p.name, c.id, c.name FROM products as p
JOIN categories as c
ON p.id = c.id;