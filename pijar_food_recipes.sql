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
