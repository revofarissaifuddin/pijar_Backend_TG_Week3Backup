const express = require("express");
const router = express.Router();
const { getCategory, inputCategory, getCategoryById, putCategoryById, removeCategoryById } = require("../controller/controllerCategory");

router.get("/", getCategory);
router.post("/", inputCategory);
router.get("/:id", getCategoryById);
router.put("/:id", putCategoryById);
router.delete("/:id", removeCategoryById);

module.exports = router;