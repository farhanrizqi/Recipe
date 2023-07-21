const {
  getRecipe,
  getRecipeById,
  getSearchRecipe,
  getSortRecipe,
  deleteRecipe,
  postRecipe,
  putRecipe,
} = require("../model/recipeM");

const recipeController = {
  getData: async (req, res, next) => {
    let data = await getRecipe();
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

    try {
      let data = await getRecipeById(id);
      console.log(data);
      if (!data.rows[0]) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "GET data success",
        data: data.rows[0],
      });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching data" });
    }
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
      let searchData = await getSearchRecipe(data);
      let countData = await getSortRecipe(data);

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
      let data = await deleteRecipe(id);
      console.log(data);
      if (!data.rows[0] || !id || id <= 0 || isNaN(id)) {
        return res.status(200).json({
          status: 200,
          message: "GET data success",
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
      const { title, ingredients, categoryid, photos } = req.body;
      if (!title || !ingredients || !categoryid || !photos) {
        return res.status(404).json({ message: "All input required" });
      }
      let data = {
        title,
        ingredients,
        categoryid,
        photos,
      };
      let result = postRecipe(data);
      console.log(result);
      return res.status(200).json({ message: "Input data success", data });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { title, ingredients, categoryid, photos } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "ID not found" });
    }

    let idData = await getRecipeById(id);

    let data = {
      title: title || idData.rows[0].title,
      ingredients: ingredients || idData.rows[0].ingredients,
      categoryid: categoryid || idData.rows[0].categoryid,
      photos: photos || idData.rows[0].photos,
    };

    let result = putRecipe(data, id);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "Update data recipe success", data });
  },
};

module.exports = recipeController;
