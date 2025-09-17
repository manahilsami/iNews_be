// require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");

// const cors = require("cors");
// app.use(cors());

// const { errors } = require("celebrate");
// app.use(errors());

const { PORT = 3000 } = process.env;

app.use(express.json());

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});

// const mainRouter = require("./routes/index");
// const errorHandler = require("./middlewares/error-handler");
// const { requestLogger, errorLogger } = require("./middlewares/logger");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/wtwr_db")
//   .then(() => {
//     // Connected to DB successfully
//   })
//   .catch(console.error);

// app.use(requestLogger);

// app.use("/", mainRouter);

// app.use(errorLogger);

// app.use(errorHandler);
