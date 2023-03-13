const express = require("express");
const router = express.Router();
const { getRecipes,getDataRecipesById,getRecipesByIdUsers,getDeletedRecipesById,inputRecipes,putRecipesById,removeRecipesById,getSearchRecipes } = require("../controller/controllerRecipes");
const {protect} = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.get("/public", getRecipes);
router.get("/coba/:id", protect, getDataRecipesById);

router.post("/", protect, upload.single("photo"), inputRecipes);
router.get("/", protect, getRecipes);
router.get("/my-recipe", protect, getRecipesByIdUsers);
router.get("/my-recipe/deleted", protect, getDeletedRecipesById);
router.get("/all-recipe", getSearchRecipes);
router.put("/my-recipe/:id", protect, upload.single("photo"), putRecipesById);
router.delete("/my-recipe/:id", protect, removeRecipesById);

module.exports = router;
