const Article = require("../models/article");
const { BadRequestError, NotFoundError } = require("../utils/customErrors");
const ERROR_CODES = require("../utils/errors");

const saveArticle = (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("Request owner:", req.user._id);
  const { title, description, image, source, date, link, keyword } = req.body;

  Article.create({
    title,
    description,
    image,
    source,
    date,
    link,
    keyword,
    owner: req.user._id,
  })
    .then((article) => res.status(ERROR_CODES.CREATED.code).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed to create article"));
      } else {
        next(err);
      }
    });
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(ERROR_CODES.OK.code).send(articles))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  // articleId may contain slashes, so decode it
  const articleLink = decodeURIComponent(req.params.articleId);
  Article.findOneAndDelete({ link: articleLink, owner: req.user._id })
    .then((deletedArticle) => {
      if (!deletedArticle) {
        // If not found, return 200 OK with a message
        return res
          .status(ERROR_CODES.OK.code)
          .send({ message: "Article not found, nothing deleted." });
      }
      res.status(ERROR_CODES.OK.code).send(deletedArticle);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  saveArticle,
  getArticles,
  deleteArticle,
};
