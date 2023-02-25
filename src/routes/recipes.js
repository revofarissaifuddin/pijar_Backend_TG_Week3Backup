const express = require("express");
const router = express.Router();
const { getRecipes,getRecipesById,inputRecipes,putRecipesById,removeRecipesById,getSearchRecipes } = require("../controller/controllerRecipes");
const {protect} = require("../middleware/auth")

router.get("/",protect, getRecipes);
router.post("/",protect, inputRecipes);
router.get("/my-recipe", protect, getRecipesById);
// router.get("/", getSearchRecipes);
// router.put("/:id", putRecipesById);
// router.delete("/:id", removeRecipesById);

module.exports = router;
