const express = require("express");

require("./db").connectToMongoDB(); // Connect to MongoDB
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: http://localhost:${PORT}`);
});

module.exports = app;
