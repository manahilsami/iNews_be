const router = require("express").Router();
const userRoutes = require("./users");
const articleRoutes = require("./articles");
const auth = require("../middlewares/auth");

// public routes
router.use("/users", userRoutes);
router.use("/articles", auth, articleRoutes);

module.exports = router;
