const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.deleteOne({ _id: id });
  return res.json({ status: true, blog });
};

exports.getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ status: false, blog: null });
    }

    return res.json({ status: true, blog });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    console.log({ state });

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ status: false, blog: null });
    }

    blog.state = state;

    await blog.save();

    return res.json({ status: true, blog });
  } catch (error) {
    res.status(500).json(error);
  }
};
