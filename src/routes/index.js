const express = require("express");
const router = express.Router();
const Users = require("./users");
const Recipes = require("./recipes");
const Category = require("./category");

router.use("/users", Users);
router.use("/recipes", Recipes);
router.use("/category", Category);

module.exports = router;
