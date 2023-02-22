const express = require("express");
const router = express.Router();
const Users = require("./users");
const Recipes = require("./recipes");
const Category = require("./category");
// const handleErrors = require("./src/middleware/errorHandler");


router.use("/users", Users, (req, res) => {
    res.status(404).json({message:"Not Found",})
});
router.use("/recipes", Recipes, (req, res) => {
    res.status(404).json({ message: "Not Found" });
});
router.use("/category", Category, (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

module.exports = router;
