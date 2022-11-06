const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
process.env.MONGODB_URI = "mongodb://localhost:27017/BloggingApi";
const app = require("../../app");
const blogModel = require("../../models/blogModel");

const header = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjIyNWYxZjVkYTBkZTJlZWQwYjI2NCIsImVtYWlsIjoic2FtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2Njc3MzYzNTMsImV4cCI6MTY2NzczOTk1M30.buMyutmA3N1NlgAj7BsStOj9KBGi1PTasNhgRw4D61k`,
};

chai.use(chaiHttp);
chai.should();
chai.expect();

const cleanup = async () => {
  await blogModel.deleteMany();
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

it.skip("DELETE /blog/:id", async () => {
  return new Promise(async (resolve) => {
    await cleanup();
    const blog = await blogModel.create({
      title: "Body",
      description: "blog",
      state: "draft",
      author: "Jack",
      tags: ["ok", "body "],
      body: "Protein is what your body uses to build new cells, to create thinking neurotransmitters, plus whatever immune cells your body needs right now. It's made up of many 'amino acid' molecules. Some foods contain all of the amino acids, some only some of them. Your stomach has a big job ahead of it when you eat protein: those molecules are tough to break down into amino acids so your stomach has to use strong acids, enzymes, as well as physical force. But once the job is done your body is ready to re-shape those amino acids into new cells, enzymes, neurotransmitters, whatever needs to be built.",
    });

    chai
      .request(app)
      .delete(`/blog/${blog._id}`)
      .set(header)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        resolve();
      });
  });
});

it.skip("PATCH /blog/:id", async () => {
  return new Promise(async (resolve) => {
    await cleanup();
    const blog = await blogModel.create({
      title: "Body",
      description: "blog",
      state: "draft",
      author: "Jack",
      tags: ["ok", "body "],
      body: "Protein is what your body uses to build new cells, to create thinking neurotransmitters, plus whatever immune cells your body needs right now. It's made up of many 'amino acid' molecules. Some foods contain all of the amino acids, some only some of them. Your stomach has a big job ahead of it when you eat protein: those molecules are tough to break down into amino acids so your stomach has to use strong acids, enzymes, as well as physical force. But once the job is done your body is ready to re-shape those amino acids into new cells, enzymes, neurotransmitters, whatever needs to be built.",
    });

    chai
      .request(app)
      .patch(`/blog/${blog._id}`)
      .set(header)
      .send({ state: "published" })
      .end((err, response) => {
        response.body.should.have.property("blog");
        console.log(response.body);
        // response.should.have.status(201);
        // expect(response.body.blog).toBeDefined();
        // expect(response.body.blog.state).toBe("published");
        // response.body.should.be.a("object");
        // response.body.should.have.property("blog");
        resolve();
      });
  });
});
