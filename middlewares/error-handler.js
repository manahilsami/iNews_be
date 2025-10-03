const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const {
    statusCode = INTERNAL_SERVER_ERROR.code,
    message = INTERNAL_SERVER_ERROR.message,
  } = err;

  res.status(statusCode).send({
    message,
  });
};

module.exports = errorHandler;
