const router = require("express").Router();
const {
  saveArticle,
  getArticles,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateArticleId,
  validateArticle,
} = require("../middlewares/validation");

router.post("/", validateArticle, saveArticle);
router.get("/", getArticles);
router.delete("/:articleId(*)", deleteArticle);

module.exports = router;
