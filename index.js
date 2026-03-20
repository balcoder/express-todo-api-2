const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

const todoRoutes = require("./routes/todos");

// body-parser allows us to access different types of data from req.body in our routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.json({ message: "Hi from index.js object" });
});

app.use("/api/todos", todoRoutes);

// start the express server
app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
