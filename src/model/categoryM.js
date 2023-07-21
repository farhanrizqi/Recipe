const pg = require("../config/db");

// TODO GET START =========================================================//
const getCategory = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT * FROM category;", (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

// TODO GET END ===========================================================//
// TODO DELETE START =========================================================//
const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM category WHERE id = ${id}`, (err, res) => {
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
const postCategory = (data) => {
  const { name } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `INSERT INTO
      category (
          name
      )
  VALUES (
          '${name}'
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
const putCategory = (data, id) => {
  const { name } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `UPDATE category SET name = '${name}' WHERE id = '${id}'`,
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
  getCategory,
  getCategoryById,
  deleteCategory,
  postCategory,
  putCategory,
};
