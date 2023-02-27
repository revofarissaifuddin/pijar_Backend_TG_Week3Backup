-- Active: 1677139201868@@localhost@5432@pijar_backend_tg_week3backup@public
/* -- create table users in databases pijar_backend_tg_week3 */
/* CREATE TABLE users(id SERIAL PRIMARY KEY, 
    name VARCHAR NOT NULL, 
    email VARCHAR NOT NULL,
    phone NUMERIC NOT NULL,
    password VARCHAR NOT NULL,
    retypepassword VARCHAR NOT NULL); */

-- ALTER TABLE users add PRIMARY KEY(id); tambah pk
-- ALTER TABLE users MODIFY name VARCHAR NOT NULL; modif not null
INSERT INTO users(name,email,phone,password,retypepassword) VALUES('revofs','revofs@gmail.com',081111111333,'revo','revo');
DELETE FROM users WHERE id='1';
SELECT * FROM recipes ORDER BY id DESC;

/* -- create table recipe in databases pijar_backend_tg_week3 */
CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    descriptions TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,

    );

INSERT INTO recipes(title,descriptions,photo,created_at,category_id) VALUES('ayam bakar','ayam kecap manis','http://localhost','2023-02-14 22:08:04',1);
DELETE FROM recipes WHERE id='5';
SELECT*FROM recipes ORDER BY id DESC;

SELECT recipes.title, recipes.descriptions, recipes.photo, recipes.users_id, recipes.created_at FROM recipes WHERE recipes.title ILIKE 's%' ORDER BY recipes.created_at ASC LIMIT 5;


/* -- create table users in databases pijar_backend_tg_week3 */
CREATE TABLE category(id SERIAL, name VARCHAR);
ALTER TABLE category ADD PRIMARY KEY (id);
INSERT INTO category(name) VALUES('snack');
SELECT*FROM category ORDER BY id DESC;

-- hapus data tabel
DROP TABLE recipes;



/* ================================NEW QUERY DATA===================================== */
/* add users table */

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    photo VARCHAR,
    verif INT DEFAULT 0,
    OTP VARCHAR,
    create_at TIMESTAMP
);

/* add recipes table */
CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    descriptions TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    category_id  INT

    );
/* add category table */
CREATE TABLE category(id SERIAL, name VARCHAR);
ALTER TABLE category ADD PRIMARY KEY (id);

SELECT * FROM recipes;

INSERT INTO users(id,email,password,fullname)VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','revo@revo.id','123','revofaris');

ALTER TABLE recipes add deleted_at VARCHAR;

ALTER TABLE recipes ADD Foreign Key (category_id) REFERENCES category(id);

ALTER TABLE recipes add deleted_at TIMESTAMP DEFAULT NULL;

SELECT recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.deleted_at IS NULL AND recipes.title ILIKE '%goreng%'  ORDER BY recipes.created_at DESC ;
