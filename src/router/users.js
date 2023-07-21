const {
  getData,
  getDataById,
  getSpecData,
  deleteData,
  postData,
  putData,
} = require("../controller/usersC");
const app = require("express");
const router = app.Router();

router.get("/", getData);
router.get("/spc", getSpecData);
router.get("/:id", getDataById);
router.delete("/:id", deleteData);
router.put("/:id", putData);
router.post("/", postData);

module.exports = router;
