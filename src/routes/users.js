const express = require("express");
const router = express.Router();
const { createUsers,sendOTPEmail, getUsers, findUserByID, updateUsers, removeDataById } = require("../controller/controllerUser");
const { protect } = require("../middleware/auth");

router.get("/", protect, getUsers);
router.post("/", createUsers);
router.put("/send-otp", sendOTPEmail);
router.get("/my-users/", protect, findUserByID);
router.put("/my-users/", protect, updateUsers);
router.delete("/my-users/", protect, removeDataById);

module.exports = router;
