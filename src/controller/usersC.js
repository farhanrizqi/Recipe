const {
  getUsers,
  getUserById,
  getSearchUsers,
  getSortUsers,
  getUserByEmail,
  createUser,
  putUsers,
} = require("../model/usersM");
const argon2 = require("argon2");
const { GenerateToken } = require("./../helpers/generateToken");

const usersController = {
  getData: async (req, res, next) => {
    let data = await getUsers();
    console.log(data);
    if (data) {
      return res
        .status(200)
        .json({ status: 200, message: "GET data success", data: data.rows });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { name, email, pass, role, photos, updated_at } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let idData = await getUserById(id);
    const hash = await argon2.hash(pass);

    let data = {
      name: name || idData.rows[0].name,
      email: email || idData.rows[0].email,
      pass: hash || idData.rows[0].pass,
      role: role || idData.rows[0].role,
      photos: photos || idData.rows[0].photos,
      created_at: idData.rows[0].created_at,
      updated_at,
    };

    let result = putUsers(data, id);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "Update data users success", data });
  },

  getSpecData: async (req, res, next) => {
    try {
      const { search, searchBy, limit, order } = req.query;

      let page = req.query.page || 1;
      let limiter = limit || 5;

      data = {
        search: search || "",
        searchBy: searchBy || "title",
        offset: (page - 1) * limiter,
        limit: limit || 5,
        order: order || "ASC" || "DESC",
      };
      let searchData = await getSearchUsers(data);
      let countData = await getSortUsers(data);

      let pagination = {
        totalPage: Math.ceil(countData.rows[0].count / limiter),
        totalData: parseInt(countData.rows[0].count),
        pageNow: parseInt(page),
      };

      console.log("dataRecipe");
      console.log(searchData);
      console.log("Total Data");
      console.log(countData.rows[0].count);

      if (searchData.rows.length > 0) {
        res.status(200).json({
          status: 200,
          message: "Get data success",
          data: searchData.rows,
          pagination,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "No data found",
          data: [],
          pagination,
        });
      }
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  },

  regis: async (req, res, next) => {
    let { name, email, pass, role, photos, created_at } = req.body;

    if (!name || !email || !pass) {
      return res.status(404).json({
        status: 404,
        message: "Please fill email, passwords, and name correctly.",
      });
    }

    let user = await getUserByEmail(email);

    if (user.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: "This is email address already in use",
      });
    }

    hash = await argon2.hash(pass);

    let dataUser = {
      name,
      email,
      pass: hash,
      role,
      photos,
      created_at,
    };

    let data = await createUser(dataUser);
    console.log(data);

    if (!data.rowCount == 1) {
      return res
        .status(404)
        .json({ status: 404, message: "Registration failed" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Registration success" });
  },
  login: async (req, res, next) => {
    let { email, pass } = req.body;
    console.log(email, pass);

    if (!email || !pass) {
      return res.status(404).json({
        status: 404,
        message: "Wrong email or password.",
      });
    }

    let data = await getUserByEmail(email);
    console.log(data.rows[0]);

    if (!data.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: "Email hasn't been registered" });
    }

    let users = data.rows[0];
    console.log("users.pass");
    console.log(users.pass);
    let verify = await argon2.verify(users.pass, pass);
    if (!verify) {
      return res.status(404).json({ status: 404, message: "Wrong password" });
    }
    delete users.pass;
    let token = GenerateToken(users);
    users.token = token;

    res.status(200).json({ status: 200, message: "GET data success", users });
  },
};

module.exports = usersController;
