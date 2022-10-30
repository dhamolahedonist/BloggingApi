const express = require("express");
const blogController = require("../controllers/blogController");

const blogRoute = express.Router();
const blogRoutes = express.Router();

blogRoute.post("/blog/create", blogController.createBlog);
blogRoute.delete("/blog/:id", blogController.deleteBlog);
blogRoutes.get("/blog/:blogId", blogController.getBlog);
blogRoutes.get("/blogs", blogController.getBlogs);
blogRoute.patch("/blog/:id", blogController.updateBlog);

module.exports = {
  blogRoute,
  blogRoutes,
};
