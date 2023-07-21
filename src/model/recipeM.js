const pg = require("../config/db");

// TODO GET START =========================================================//
const getRecipe = () => {
  return new Promise((resolve, reject) => {
    pg.query(
      "SELECT recipe.id, recipe.title, recipe.ingredients, recipe.categoryid, category.name as category, recipe.photos FROM recipe JOIN category ON recipe.categoryid = category.id",
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`SELECT * FROM recipe WHERE id = ${id}`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const getSearchRecipe = (data) => {
  const { search, searchBy, offset, limit, order } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photos, category.name AS category FROM recipe JOIN category ON recipe.categoryid = category.id WHERE ${searchBy} ILIKE '%${search}%' ORDER BY recipe.id ${order} OFFSET ${offset} LIMIT ${limit} `,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getSortRecipe = (data) => {
  const { search, searchBy } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT COUNT(*)
FROM (
        SELECT recipe.id
        FROM recipe
            JOIN category ON recipe.categoryid = category.id
        WHERE ${searchBy} ILIKE '%${search}%'
    ) AS queryData`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

// TODO GET END ===========================================================//
// TODO DELETE START =========================================================//
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM recipe WHERE id = ${id}`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};
// TODO DELETE END ===========================================================//
// TODO POST START =========================================================//
const postRecipe = (data) => {
  const { title, ingredients, categoryid, photos } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `INSERT INTO
      recipe (
          title,
          ingredients,
          categoryid,
          photos
      )
  VALUES (
          '${title}',
          '${ingredients}',
          ${categoryid},
          '${photos}'
      )`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};
// TODO POST END ===========================================================//
// TODO PUT START =========================================================//
const putRecipe = (data, id) => {
  const { title, ingredients, categoryid, photos } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `UPDATE recipe SET title = '${title}', ingredients = '${ingredients}', categoryid = '${categoryid}', photos = '${photos}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};
// TODO PUT END ===========================================================//

module.exports = {
  getRecipe,
  getRecipeById,
  getSearchRecipe,
  getSortRecipe,
  deleteRecipe,
  postRecipe,
  putRecipe,
};
