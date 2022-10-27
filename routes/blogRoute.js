const express = require("express");
const blogController = require("../controllers/blogController");

const blogRoute = express.Router();

blogRoute.post("/blog/create", blogController.createBlog);
blogRoute.delete("/blog/:id", blogController.deleteBlog);
blogRoute.get("/blog/:blogId", blogController.getBlog);
blogRoute.patch("/blog/:id", blogController.updateBlog);

module.exports = blogRoute;
