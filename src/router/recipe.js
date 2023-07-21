const {
  getData,
  getDataById,
  getSpecData,
  deleteData,
  postData,
  putData,
} = require("../controller/recipeC");
const app = require("express");
const router = app.Router();

router.get("/", getData);
router.get("/spc", getSpecData); // Reordered this route before "/:id" route
router.get("/:id", getDataById);
router.delete("/:id", deleteData);
router.put("/:id", putData);
router.post("/", postData);

module.exports = router;

// // ! recipe section start ==================================================================//
// // TODO GET start ==========================================================================//
// let data = ["Croissant", "Pomme de terre", "Vin Rouge"];

// app.get("/recipe", (req, res) => {
//   res.status(200).json({ message: "Get data successfully!", data });
// });

// app.get("/recipe/:id", (req, res) => {
//   let { id } = req.params;
//   if (!id) {
//     return res.status(404).json({ message: "Data not found" });
//   }
//   res
//     .status(200)
//     .json({ message: "Get data successfully!", data: `${data[id - 1]}` });
// });
// // TODO GET end ============================================================================//
// // TODO POST start =========================================================================//
// app.post("/recipe", (req, res) => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(404).json({ message: "Input recipe required" });
//   }

//   data = [...data, title];
//   console.log(data);
//   res.status(200).json({ message: "post recipe success", data });
// });
// // TODO POST end ===========================================================================//

// // TODO PUT/PATCH start ====================================================================//
// app.put("/recipe/:id", (req, res) => {
//   const { title } = req.body;
//   let { id } = req.params;

//   // validate input
//   if (!title || !id) {
//     return res.status(404).json({ message: "name and id required" });
//   }

//   // id = parseInt(id);
//   // console.log(typeof id);

//   id = parseInt(id);
//   // validate data
//   if (id > data.length || id <= 0 || isNaN(id)) {
//     return res.status(404).json({ message: "data not found" });
//   }

//   //
//   data.forEach((item, index) => {
//     console.log(index);
//     console.log(id);
//     console.log("item : ", item);
//     if (index == id - 1) {
//       data[index] = title;
//     }
//   });

//   res.status(200).json({ message: "put recipe success", data });
//   // data = [...data, title];
//   // console.log(data);
// });
// // TODO PUT/PATCH end =====================================================================//
// // TODO DELETE start ====================================================================//
// app.delete("/recipe/:id", (req, res) => {
//   let { id } = req.params;
//   id = parseInt(id);
//   // validate data
//   if (id > data.length || id <= 0 || isNaN(id)) {
//     return res.status(404).json({ message: "data not found" });
//   }

//   let newData = data.filter((item, index) => {
//     if (index !== id - 1) {
//       return item;
//     }
//   });

//   data = newData;
//   console.log(data);
//   return res.status(200).json({ message: "Delete success", data });
// });
// // TODO DELETE end =====================================================================//

// // ! Recipe section end====================================================================//
