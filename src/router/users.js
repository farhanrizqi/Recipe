const {
  getData,
  getSpecData,
  putData,
  login,
  regis,
} = require("../controller/usersC");
const express = require("express");
const router = express.Router();

router.get("/", getData);
router.get("/spc", getSpecData);
router.put("/:id", putData);
router.post("/login", login);
router.post("/regis", regis);

module.exports = router;
