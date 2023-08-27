const express = require("express");
const usersController = require("./users/users.controller");
const router = express.Router();

router.get("/:id/articles", usersController.displayArticles);

module.exports = router;