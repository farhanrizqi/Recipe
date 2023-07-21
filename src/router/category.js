const {
  getData,
  getDataById,
  deleteData,
  postData,
  putData,
} = require("../controller/categoryC");
const app = require("express");
const router = app.Router();

router.get("/", getData);
router.get("/:id", getDataById);
router.delete("/:id", deleteData);
router.put("/:id", putData);
router.post("/", postData);

module.exports = router;
