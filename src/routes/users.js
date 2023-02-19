const express = require("express");
const router = express.Router();
const { getUsers, findUserByID,createUsers, updateUsers, removeDataById } = require("../controller/controllerUser");

router.get("/", getUsers);
router.post("/", createUsers);
router.get("/:id", findUserByID);
router.put("/:id", updateUsers);
router.delete("/:id", removeDataById);

module.exports = router;

/*=================================Old code CRUD User==========================================*/
/* const express = require("express");
const router = express.Router();
const controller = require("../controller/controllerUser");


router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUsersById);
router.put("/:id", controller.updateUsers);
router.delete("/:id", controller.removeUsers);
module.exports = router; */
