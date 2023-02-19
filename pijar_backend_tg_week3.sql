/* -- create table users in databases pijar_backend_tg_week3 */
CREATE TABLE users(id SERIAL PRIMARY KEY, 
    name VARCHAR NOT NULL, 
    email VARCHAR NOT NULL,
    phone NUMERIC NOT NULL,
    password VARCHAR NOT NULL,
    retypepassword VARCHAR NOT NULL);

-- ALTER TABLE users add PRIMARY KEY(id); tambah pk
-- ALTER TABLE users MODIFY name VARCHAR NOT NULL; modif not null
INSERT INTO users(name,email,phone,password,retypepassword) VALUES('revofs','revofs@gmail.com',081111111333,'revo','revo');
DELETE FROM users WHERE id='1';
SELECT * FROM users ORDER BY id DESC;

/* -- create table recipe in databases pijar_backend_tg_week3 */
CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    descriptions TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id INT REFERENCES users(id)
    );

INSERT INTO recipes(title,descriptions,photo,users_id,created_at) VALUES('ayam bakar','ayam kecap manis','http://localhost',19,'2023-02-14 22:08:04');
DELETE FROM recipes WHERE id='5';
SELECT*FROM recipes ORDER BY id DESC;
SELECT * FROM recipes JOIN category ON recipes.category;
SELECT recipes.title, recipes.descriptions, recipes.photo, recipes.users_id, recipes.created_at FROM recipes WHERE recipes.title ILIKE 's%' ORDER BY recipes.created_at ASC LIMIT 5;


/* -- create table users in databases pijar_backend_tg_week3 */
CREATE TABLE category(id SERIAL, name VARCHAR);
INSERT INTO category(name) VALUES('pedas asin');
SELECT*FROM category ORDER BY id DESC;

-- hapus data tabel
DROP TABLE recipes;
-- show data now
SELECT now()
