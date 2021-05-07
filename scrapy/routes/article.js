const express = require("express");
const { listenerCount } = require("../models/article");
let Article = require("../models/article");
const router = express.Router();
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});
router.get("/:id", (req, res) => {
  //const article=Article.findById(req.params.id)
  res.send(req.params.id);
});

router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect("${article.id}");
  } catch (e) {
    res.render("new", { article: article });
  }
});

module.exports = router;
