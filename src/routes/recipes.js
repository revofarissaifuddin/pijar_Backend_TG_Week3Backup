const express = require("express");
const router = express.Router();
const { getRecipes,getRecipesById,inputRecipes,putRecipesById,removeRecipesById,getSearchRecipes } = require("../controller/controllerRecipes");
const {protect} = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.post("/", protect, upload.single("photo"), inputRecipes);
router.get("/", protect, getRecipes);
router.get("/public", getRecipes);
router.get("/my-recipe", protect, getRecipesById);
router.get("/all-recipe", protect, getSearchRecipes);
router.put("/my-recipe/:id", protect, upload.single("photo"), putRecipesById);
router.delete("/:id", protect, removeRecipesById);

module.exports = router;
