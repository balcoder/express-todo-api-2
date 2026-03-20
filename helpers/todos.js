const db = require("../models");
// get one todo
exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then((foundTodo) => {
      res.json(foundTodo);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// get all todos
exports.getTodos = (req, res) => {
  db.Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
    .then((newTodo) => res.status(201).json(newTodo))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {
    returnDocument: "after",
  })
    .then((updatedTodo) => {
      res.json(updatedTodo);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.deleteTodo = (req, res) => {
  db.Todo.findByIdAndDelete(req.params.todoId)
    .then((deletedTodo) => {
      console.log(`Todo id: ${deletedTodo.id} successfully deleted`);
      res.json(deletedTodo);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
module.exports = exports;
