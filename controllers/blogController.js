const Blog = require("../models/blogModel");

// create blog
exports.createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.deleteOne({ _id: id });
  return res.json({ status: true, blog });
};

// get blog by id
exports.getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    // for everytime a blog is requested it increase the read_count by 1
    blog.read_count += 1;

    // const blogPost = blog.body.length / 200;
    const blogPost = blog.body.split(" ").length;
    const wordPerminute = 200;
    let readingTime = blogPost / wordPerminute;
    readingTime = +readingTime.toFixed(1);
    readingTime = `Approximate reading time ${readingTime} min. Word count: ${blogPost}`;

    blog.reading_time = readingTime;

    blog.save();

    // console.log(readingTime);
    // const wordCount = blogPost.split(" ");
    // console.log(wordCount);
    // const seconds = wordCount;
    // console.log(seconds);
    if (!blog) {
      3;
    }

    return res.json({ status: true, blog });
  } catch (error) {
    res.status(500).json(error);
  }
};
// update the blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
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

// get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, state, author, title, tags } = req.query;
    const sort = [];
    // const readCount = await Blog.find();
    // // const firstCount = first[0].read_count;
    // for (let count of readCount) {
    //   const ans = (count.read_count += 1);
    //   console.log(ans);
    // }

    for (const param in req.query) {
      if (["read_count", "createdAt"].includes(param)) {
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
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.json({ status: true, blogs });
  } catch (error) {
    res.status(500).json(error);
  }
};
