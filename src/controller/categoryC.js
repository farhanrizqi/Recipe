const {
  getCategory,
  getCategoryById,
  deleteCategory,
  postCategory,
  putCategory,
} = require("../model/categoryM");

const categoryController = {
  getData: async (req, res, next) => {
    let data = await getCategory();
    console.log(data);
    if (data) {
      return res
        .status(200)
        .json({ status: 200, message: "get data success", data: data.rows });
    }
  },

  getDataById: async (req, res, next) => {
    const { id } = req.params;
    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let data = await getCategoryById(id);
    console.log(data);
    if (!data.rows[0]) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      status: 200,
      message: "get data by id success",
      data: data.rows[0],
    });
  },

  deleteData: async (req, res, next) => {
    try {
      const { id } = req.params;
      let data = await deleteCategory(id);
      console.log(data);
      if (!data.rows[0] || !id || id <= 0 || isNaN(id)) {
        return res.status(200).json({
          status: 200,
          message: "Delete data success",
          data: data.rows[0],
        });
      }
      return res.status(404).json({ message: "Delete data failed" });
      // return res.status(404).json({ message: "Data not found" });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  postData: (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(404).json({ message: "All input required" });
      }
      let data = {
        name,
      };
      let result = postCategory(data);
      console.log(result);
      return res.status(200).json({ message: "Input data success", data });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let idData = await getCategoryById(id);

    let data = {
      name: name || idData.rows[0].name,
    };

    let result = putCategory(data, id);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "Update data category success", data });
  },
};

module.exports = categoryController;
