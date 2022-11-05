const Blog = require("../models/blogModel");
const User = require("../models/userModel");

// create blog
exports.create = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    newBlog.user = req.user.user._id;
    const savedBlog = await newBlog.save();
    res.status(200).json({ savedBlog });
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete blog
exports.delete = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.deleteOne({ _id: id, user: req.user.user });

  if (blog.deletedCount) {
    return res.json({ status: true, blog });
  }

  return res.json({
    status: false,
    message: "Invalid blog id",
  });
};

// get blog by id
exports.get = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("user");
    blog.read_count += 1;

    // This calculates the time used to read a blog post
    const blogPost = blog.body.split(" ").length;
    const wordPerminute = 200;
    let readingTime = blogPost / wordPerminute;

    const splitNum = readingTime.toString().split(".");
    const min = splitNum[0];
    const sec = splitNum[1];
    const convertToSeconds = sec * 0.6;
    const roundSec = Math.floor(convertToSeconds);

    readingTime = `Approximate reading time ${min}min ${roundSec}sec. Word count: ${blogPost}`;

    blog.reading_time = readingTime;

    blog.save();

    if (!blog) {
      return res.status(404).json({ status: false, blog: null });
    }

    return res.json({ status: true, blog });
  } catch (error) {
    res.status(500).json(error);
  }
};
// update the blog
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const blog = await Blog.findOne({ _id: id, user: req.user.user });

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

// get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, state, author, title, tags } = req.query;
    const sort = [];

    for (const param in req.query) {
      if (["read_count", "createdAt", "reading_time"].includes(param)) {
        const direction = req.query[param];
        const sort_direction = direction == "asc" ? 1 : -1;
        const row_sort = [param, sort_direction];
        sort.push(row_sort);
      }
    }

    const filter = {};

    if (state) {
      filter.state = state;
    }

    if (author) {
      filter.author = author;
    }
    if (title) {
      filter.title = title;
    }
    if (tags) {
      filter.tags = tags;
    }

    const blogs = await Blog.find(filter)
      .populate("user")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.json({ status: true, blogs });
  } catch (error) {
    res.status(500).json(error);
  }
};
