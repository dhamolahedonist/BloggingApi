process.env.MONGODB_URI = "mongodb://localhost:27017/BloggingApi";

const request = require("supertest");
const app = require("../../app");
const blogModel = require("../../models/blogModel");

const header = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjNjMjkxNDc5OGVmZTQyOGEzMTg2YiIsImVtYWlsIjoic2FtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2Njc1ODU3NDAsImV4cCI6MTY2NzU4OTM0MH0.ghUxgFbgv5dpUpLT65Jngrwt8VZu3n9vwuNS1DO26qs`,
};

// Clean Up Our Collections
const cleanup = async () => {
  await orderModel.deleteMany();
};

// Get all orders
describe("blogRoute ", () => {
  it("GET /blog", async () => {
    await cleanup();

    const blog = await blogModel.create({
      title: "Body",
      description: "blog",
      author: "Jack",
      tags: ["ok", "body "],
      body: "Protein is what your body uses to build new cells, to create thinking neurotransmitters, plus whatever immune cells your body needs right now. It's made up of many 'amino acid' molecules. Some foods contain all of the amino acids, some only some of them. Your stomach has a big job ahead of it when you eat protein: those molecules are tough to break down into amino acids so your stomach has to use strong acids, enzymes, as well as physical force. But once the job is done your body is ready to re-shape those amino acids into new cells, enzymes, neurotransmitters, whatever needs to be built.",
    });

    const test = await request(app)
      .get("/blog")
      .set(header)
      .expect(200)
      .expect("content-type", /json/);

    // expect(test.body.status).toBe(true);
    expect(test.body.blog._id).toBeDefined();
    expect(blog.author).toBe("Jack");
  });
});
