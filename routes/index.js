const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateUserInfo,
  userLogInAuthentication,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/customErrors");

const userRouter = require("./users");
const articlesRouter = require("./articles");

router.post("/signup", validateUserInfo, createUser);
router.post("/signin", userLogInAuthentication, loginUser);

router.use(auth); // all routes below require authentication

router.use("/users", userRouter);
router.use("/articles", articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
