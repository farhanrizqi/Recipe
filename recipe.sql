-- Active: 1689596961095@@127.0.0.1@5432@recipe13

--create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    pass VARCHAR
);
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    ingredients VARCHAR,
    categoryId INTEGER,

    CONSTRAINT category_recipe FOREIGN KEY(categoryId) REFERENCES category(id)
);


-- insertions
INSERT INTO users (name, email, pass) VALUES ('John', 'jhontor@gmail.com', 'admin');
INSERT INTO users (name, email, pass) VALUES ('Lintang', 'lantung@gmail.com', 'admin');
INSERT INTO users (name, email, pass) VALUES ('Duka', 'lara@gmail.com', 'admin');
INSERT INTO users (name, email, pass) VALUES ('Hari', 'hari@gmail.com', 'admin');
INSERT INTO users (name, email, pass) VALUES ('Hari', 'hari@gmail.com', 'admin');


-- read
SELECT * FROM users WHERE id = 2;


-- delete
DROP TABLE users;
DROP TABLE category;
DROP TABLE recipe;