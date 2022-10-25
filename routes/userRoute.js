const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.put("/user/:id", userController.updateUSer);
userRoute.get("/user/:id", userController.getUser);
userRoute.get("/users", userController.getUsers);
userRoute.delete("/user", userController.deleteUSer);

module.exports = userRoute;
