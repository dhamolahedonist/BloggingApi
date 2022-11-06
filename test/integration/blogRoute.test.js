const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
process.env.MONGODB_URI = "mongodb://localhost:27017/BloggingApi";
const app = require("../../app");
const blogModel = require("../../models/blogModel");

chai.use(chaiHttp);
chai.should();
chai.expect();

const cleanup = async () => {
  await blogModel.deleteMany();
};

describe("Get Blog", () => {
  it("Should return blog posts", async () => {
    return new Promise(async (resolve) => {
      await cleanup();
      const blog = await blogModel.create({
        title: "Body",
        description: "blog",
        state: "published",
        author: "Jack",
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
          expect(response.body.blogs[0]._id).to.equal(blog._id.toString());
          resolve();
        });
    });
  });
});
