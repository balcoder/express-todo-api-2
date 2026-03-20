// Connect to mongo database and export our todo compiled model
// form models/todo.js

const config = require("../config.js");
const mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.connect(
  `mongodb+srv://${config.mongodb.userName}:${config.mongodb.password}@express-todo-app-2.4i0twjt.mongodb.net/?appName=express-todo-app-2`,
);

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
