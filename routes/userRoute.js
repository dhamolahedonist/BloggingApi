const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.put("/:id", userController.updateUSer);
userRoute.get("/:id", userController.getUser);
userRoute.get("/", userController.getUsers);
userRoute.delete("/:id", userController.deleteUSer);

module.exports = userRoute;
