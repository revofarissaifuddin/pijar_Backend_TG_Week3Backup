const express = require("express");
const router = express.Router();
const { getRecipes,getRecipesById,inputRecipes,putRecipesById,removeRecipesById,getSearchRecipes } = require("../controller/controllerRecipes");

// router.get("/", getRecipes);
router.post("/", inputRecipes);
router.get("/", getSearchRecipes);
router.get("/:id", getRecipesById);
router.put("/:id", putRecipesById);
router.delete("/:id", removeRecipesById);

module.exports = router;
