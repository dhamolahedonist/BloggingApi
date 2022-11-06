const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
process.env.MONGODB_URI = "mongodb://localhost:27017/BloggingApi";
const app = require("../../app");
const blogModel = require("../../models/blogModel");
const userModel = require("../../models/userModel");

const header = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjdkZWRhYTBkYWQzNzcxMjY3ZGMyNyIsImVtYWlsIjoiZGFtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2Njc3NTE2NzQsImV4cCI6MTY2Nzc1NTI3NH0.13S7NSmAZSLfGnXrNd25aWanGw3Im1e_HhPIJCt4iDM`,
};

const user_id = "6367dedaa0dad3771267dc27";

chai.use(chaiHttp);
chai.should();
chai.expect();

const cleanup = async () => {
  await blogModel.deleteMany();
};

const getHeader = async () => {
  // Create a user
  // Get the token
  const token = null;

  return {
    Authorization: `Bearer ${token}`,
  };
};

describe("Get Blog", () => {
  it.skip("Should return blog posts", async () => {
    return new Promise(async (resolve) => {
      await cleanup();
      const blog1 = await blogModel.create({
        title: "Body",
        description: "blog",
        state: "published",
        author: "Jack",
        tags: ["ok", "body "],
        body: "Protein is what your body uses to build new cells, to create thinking neurotransmitters, plus whatever immune cells your body needs right now. It's made up of many 'amino acid' molecules. Some foods contain all of the amino acids, some only some of them. Your stomach has a big job ahead of it when you eat protein: those molecules are tough to break down into amino acids so your stomach has to use strong acids, enzymes, as well as physical force. But once the job is done your body is ready to re-shape those amino acids into new cells, enzymes, neurotransmitters, whatever needs to be built.",
      });
      const blog2 = await blogModel.create({
        title: "Body",
        description: "blog",
        state: "published",
        author: "Jude",
        tags: ["ok", "body "],
        body: "Protein is what your body uses to build new cells, to create thinking neurotransmitters, plus whatever immune cells your body needs right now. It's made up of many 'amino acid' molecules. Some foods contain all of the amino acids, some only some of them. Your stomach has a big job ahead of it when you eat protein: those molecules are tough to break down into amino acids so your stomach has to use strong acids, enzymes, as well as physical force. But once the job is done your body is ready to re-shape those amino acids into new cells, enzymes, neurotransmitters, whatever needs to be built.",
      });

      chai
        .request(app)
        .get("/blog")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("status", true);
          response.body.should.have.property("blogs");
          expect(response.body.blogs[1]._id).to.equal(blog2._id.toString());
          resolve();
        });
    });
  });
});
it.skip("POST /blog/create", async () => {
  return new Promise(async (resolve) => {
    await cleanup();

    chai
      .request(app)
      .post("/blog/create")
      .set(header)
      .send({
        title: "Body",
        description: "blog",
        author: "Jack",
        tags: ["ok", "body "],
        body: "Protein is what your body uses to build new cells",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("savedBlog");
        resolve();
      });
  });
});

it("DELETE /blog/:id", async () => {
  return new Promise(async (resolve) => {
    await cleanup();

    const user = await userModel.findById(user_id);
    const blog = await blogModel.create({
      title: "Body",
      description: "blog",
      state: "draft",
      author: "Jack",
      tags: ["ok", "body "],
      body: "body",
      user: user._id,
    });

    chai
      .request(app)
      .delete(`/blog/${blog._id}`)
      .set(header)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("status", true);
        expect(response.body.blog.acknowledged).to.equal(true);
        expect(response.body.blog.deletedCount).to.equal(1);
        resolve();
      });
  });
});

it.skip("PATCH /blog/:id", async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await cleanup();

      const user = await userModel.findById(user_id);
      const blog = await blogModel.create({
        title: "Body",
        description: "blog",
        state: "draft",
        author: "Jack",
        tags: ["ok", "body "],
        body: "Body",
        user: user._id,
      });

      //   const url = `/blog/${blog._id.toString()}`;
      //   console.log(url);

      chai
        .request(app)
        .patch(`/blog/${blog._id.toString()}`)
        .set(header)
        .send({ state: "published" })
        .end((err, response) => {
          response.body.should.have.property("blog");
          response.body.should.have.property("status", true);
          expect(response.body.blog._id).to.equal(blog._id.toString());
          expect(response.body.blog.state).to.equal("published");

          resolve();
        });
    } catch (error) {
      reject(error);
    }
  });
});
