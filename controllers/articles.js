const Article = require("../models/article");
const { BadRequestError, NotFoundError } = require("../utils/customErrors");
const ERROR_CODES = require("../utils/errors");

const createArticle = (req, res, next) => {
  const { title, description, source, link, image, date } = req.body;

  Article.create({
    title,
    description,
    source,
    link,
    image,
    date,
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
  const { articleId } = req.params;
  const currentUserId = req.user._id;

  Article.findAndDelete({ _id: articleId, owner: req.user._id })
    .orFail()
    .then((deletedArticle) =>
      res.status(ERROR_CODES.OK.code).send(deletedArticle)
    )
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Article not found"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
};
