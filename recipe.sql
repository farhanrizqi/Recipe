-- Active: 1689596961095@@127.0.0.1@5432@recipe13

--create table

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        pass VARCHAR NOT NULL
    );

CREATE TABLE
    category (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

CREATE TABLE
    recipe (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        ingredients VARCHAR NOT NULL,
        categoryId INTEGER NOT NULL,
        CONSTRAINT category_recipe FOREIGN KEY(categoryId) REFERENCES category(id)
    );

-- insertions start

-- category start

INSERT INTO category (name)
VALUES ('Appetizer'), ('Main Course'), ('Desert ');

-- category end

--users start

INSERT INTO
    users (name, email, pass)
VALUES (
        'John',
        'jhontor@gmail.com',
        'admin'
    ), (
        'Lintang',
        'lantung@gmail.com',
        'admin'
    ), (
        'Duka',
        'lara@gmail.com',
        'admin'
    ), (
        'Hari',
        'hari@gmail.com',
        'admin'
    ), (
        'Hari',
        'hari@gmail.com',
        'admin'
    );

--users end

--recipe start

INSERT INTO
    recipe (
        title,
        ingredients,
        categoryid,
        photos
    )
VALUES (
        'Vin Rouge',
        'Anggur',
        1,
        'https://placehold.co/600x400/png'
    ), (
        'Petit Canelle',
        'Gula jawa',
        3,
        'https://placehold.co/600x400/png'
    ), (
        'Ratatouille',
        'Sayuran',
        2,
        'https://placehold.co/600x400/png'
    );

--recipe end

-- read

SELECT * FROM users WHERE id = 2;

--read end

--alter

ALTER TABLE recipe ALTER COLUMN title SET NOT NULL;

ALTER TABLE recipe ALTER COLUMN ingredients SET NOT NULL;

ALTER TABLE users ALTER COLUMN name SET NOT NULL;

ALTER TABLE users ALTER COLUMN email SET NOT NULL;

ALTER TABLE users ALTER COLUMN pass SET NOT NULL;

ALTER TABLE category ALTER COLUMN name SET NOT NULL;

ALTER TABLE recipe ADD COLUMN photos VARCHAR NOT NULL;

-- delete

DROP TABLE users;

DROP TABLE category;

DROP TABLE recipe;

SELECT
    recipe.id,
    recipe.title,
    recipe.ingredients,
    recipe.photos,
    category.name AS category
FROM recipe
    JOIN category ON recipe.categoryid = category.id
WHERE
    ingredients ILIKE '%tepung%'
OFFSET 1
LIMIT 5;

SELECT COUNT(*)
FROM (
        SELECT recipe.id
        FROM recipe
            JOIN category ON recipe.categoryid = category.id
        WHERE
            ingredients ILIKE '%anggur%'
    ) AS subquery