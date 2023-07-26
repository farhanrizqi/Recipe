const {
  getRecipe,
  getRecipeById,
  deleteById,
  postRecipe,
  putRecipe,
  getRecipeAll,
  getRecipeCount,
} = require("../model/recipeM");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddrecezrk",
  api_key: "188633434879868",
  api_secret: "uSL4XTmvfV0eTt0wYqvwhJaRvxE",
});

const recipeController = {
  getDataDetail: async (req, res, next) => {
    const { search, searchBy, limit } = req.query;

    let page = req.query.page || 1;
    let limiter = limit || 5;

    data = {
      search: search || "",
      searchBy: searchBy || "title",
      offset: (page - 1) * limiter,
      limit: limit || 5,
    };
    let dataRecipe = await getRecipe(data);
    let dataRecipeCount = await getRecipeCount(data);

    let pagination = {
      totalPage: Math.ceil(dataRecipeCount.rows[0].count / limiter),
      totalData: parseInt(dataRecipeCount.rows[0].count),
      pageNow: parseInt(page),
    };

    console.log("dataRecipe");
    console.log(dataRecipe);
    console.log("total data");
    console.log(dataRecipeCount.rows[0].count);
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataRecipe.rows,
        pagination,
      });
    }
  },
  getData: async (req, res, next) => {
    let dataRecipe = await getRecipeAll();
    console.log("dataRecipe");
    console.log(dataRecipe);
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataRecipe.rows,
      });
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "Wrong ID" });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));

    console.log("dataRecipe");
    console.log(dataRecipeId);

    if (!dataRecipeId.rows[0]) {
      return res
        .status(200)
        .json({ status: 200, message: "get data recipe not found", data: [] });
    }

    return res.status(200).json({
      status: 200,
      message: "get data recipe success",
      data: dataRecipeId.rows[0],
    });
  },
  deleteDataById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "Wrong ID" });
      }

      let dataRecipeId = await getRecipeById(parseInt(id));

      let users_id = req.payload.id;
      let role = req.payload.role;

      console.log("Data ID");
      console.log(users_id);
      console.log(dataRecipeId.rows[0].users_id);
      if (users_id != dataRecipeId.rows[0].users_id || role != "admin") {
        return res.status(404).json({ message: "You're not authorized" });
      }

      let result = await deleteById(parseInt(id));
      console.log(result);
      if (result.rowCount == 0) {
        throw new Error("DELETE data failed");
      }
      return res.status(200).json({
        status: 200,
        message: "DELETE data success",
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },
  postData: async (req, res, next) => {
    const { title, ingredients, category_id } = req.body;
    console.log("post data ");
    console.log(title, ingredients, category_id);

    let users_id = req.payload.id;
    console.log("payload");
    console.log(req.payload);

    if (!title || !ingredients || !category_id) {
      return res
        .status(404)
        .json({ message: "Input title, ingredients, category " });
    }

    try {
      const cloudUpload = await cloudinary.uploader.upload(req.file.path);
      const imgUrl = cloudUpload.secure_url;

      let data = {
        title: title,
        ingredients: ingredients,
        category_id: parseInt(category_id),
        img: imgUrl,
        users_id: users_id,
      };

      // Save data to the database
      let result = await postRecipe(data);

      return res
        .status(200)
        .json({ status: 200, message: "Add data success", data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }
  },
  putData: async (req, res, next) => {
    const { id } = req.params;
    const { title, ingredients, category_id, img } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "Wrong token" });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));

    let users_id = req.payload.id;
    let role = req.payload.role;

    console.log("Data ID");
    console.log(users_id);
    console.log(dataRecipeId.rows[0].users_id);
    if (users_id != dataRecipeId.rows[0].users_id || role != "admin") {
      return res.status(404).json({ message: "You're not authorized" });
    }

    console.log("Edited data :");
    console.log(dataRecipeId.rows[0]);

    let data = {
      title: title || dataRecipeId.rows[0].title,
      ingredients: ingredients || dataRecipeId.rows[0].ingredients,
      category_id: parseInt(category_id) || dataRecipeId.rows[0].category_id,
      img: dataRecipeId.rows[0].img, // Keep the existing image URL if no new image is uploaded
    };

    // If a new image is uploaded, update the image URL in Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        data.img = result.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Failed to upload image to Cloudinary" });
      }
    }

    let result = putRecipe(data, id);
    console.log(result);

    delete data.id;

    return res
      .status(200)
      .json({ status: 200, message: "Update data success", data });
  },
};

module.exports = recipeController;
