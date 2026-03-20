const express = require("express");
const router = express.Router();
const helpers = require("../helpers/todos");
const db = require("../models"); // when we require a dir it runs index.js
// now all of our code that mogoose gives us from our todo model will be
// under db.Todo

// all our routes are prefixed with /api/todos index.js
router.route("/").get(helpers.getTodos).post(helpers.createTodo);

router
  .route("/:todoId")
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
