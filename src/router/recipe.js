const {
  getData,
  getDataById,
  deleteDataById,
  postData,
  putData,
  getDataDetail,
} = require("../controller/recipeC");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const { Protect } = require("./../middleware/protect");

router.get("/", Protect, getData);
router.post("/", Protect, upload.single("img"), postData);
router.get("/detail", getDataDetail);
router.get("/:id", getDataById);
router.put("/:id", Protect, upload.single("img"), putData);
router.delete("/:id", Protect, deleteDataById);

module.exports = router;
