const {
  getUsers,
  getUsersById,
  getSearchUsers,
  getSortUsers,
  deleteUsers,
  postUsers,
  putUsers,
} = require("../model/usersM");

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

  getDataById: async (req, res, next) => {
    const { id } = req.params;
    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let data = await getUsersById(id);
    console.log(data);
    if (!data.rows[0]) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      status: 200,
      message: "GET data by ID success",
      data: data.rows[0],
    });
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

  deleteData: async (req, res, next) => {
    try {
      const { id } = req.params;
      let data = await deleteUsers(id);
      console.log(data);
      if (!data.rows[0] || !id || id <= 0 || isNaN(id)) {
        return res.status(200).json({
          status: 200,
          message: "GET data by ID success",
          data: data.rows[0],
        });
      }
      return res.status(404).json({ message: "Delete data failed" });
      // return res.status(404).json({ message: "Data not found" });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  postData: async (req, res, next) => {
    try {
      const { name, email, pass } = req.body;
      // const hash = await argon2.hash(pass, { onError: "skip" });
      if (!name || !email || !pass) {
        return res.status(404).json({ message: "All input required" });
      }
      let data = {
        name,
        email,
        pass,
      };
      let result = postUsers(data);
      console.log(result);
      return res.status(200).json({ message: "Input data success", data });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { name, email, pass } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let idData = await getUsersById(id);

    let data = {
      name: name || idData.rows[0].name,
      email: email || idData.rows[0].email,
      pass: pass || idData.rows[0].pass,
    };

    let result = putUsers(data, id);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "Update data users success", data });
  },
};

module.exports = usersController;
