const pg = require("../config/db");
const argon2 = require("argon2");

// TODO GET START =========================================================//
const getUsers = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT * FROM users;", (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const getUsersById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const getSearchUsers = (data) => {
  const { search, searchBy, offset, limit, order } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT * FROM users WHERE ${searchBy} ILIKE '%${search}%' ORDER BY id ${order} OFFSET ${offset} LIMIT ${limit} `,
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

const getSortUsers = (data) => {
  const { search, searchBy } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT COUNT(*)
FROM (
        SELECT users.id
        FROM users
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
const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
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
const postUsers = async (data) => {
  const { name, email, pass } = data;
  const hash = await argon2.hash(pass);
  return new Promise((resolve, reject) => {
    pg.query(
      `INSERT INTO users (name, email, pass) VALUES ($1, $2, $3)`,
      [name, email, hash],
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
const putUsers = (data, id) => {
  const { name, email, pass } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `UPDATE users SET name = '${name}', email = '${email}', pass = '${pass}' WHERE id = '${id}'`,
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
  getUsers,
  getUsersById,
  getSearchUsers,
  getSortUsers,
  deleteUsers,
  postUsers,
  putUsers,
};
