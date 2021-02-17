require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const Task = require("./task");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log("/" + req.method);
  console.log("x-forwarded-for: ", req.headers["x-forwarded-for"]);
  console.log("Remote address: ", req.connection.remoteAddress);
  console.log("Request Path: ", req.path);
  next();
});

app.post("/task", (req, res) => {
  const { title, listId, owner, assigned } = req.body;
  const task = new Task({ title, listId, owner, assigned });

  task.save((err, result) => (err ? res.send({ err }) : res.send({ result })));
});
app.delete("/task/all", (req, res) => {
  Task.deleteMany({}, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});
app.put("/task", (req, res) => {
  const { _id, completed, assigned, completedAt, listId, notes } = req.body;

  if (completed !== undefined) {
    Task.updateOne(
      { _id },
      { $set: { completed } },
      { runValidators: true },
      (err, result) => (err ? res.send({ err }) : res.send({ result }))
    );
  }

  if (listId !== undefined) {
    Task.updateOne(
      { _id },
      { $set: { listId } },
      { runValidators: true },
      (err, result) => (err ? res.send({ err }) : res.send({ result }))
    );
  }

  if (assigned !== undefined) {
    Task.updateOne(
      { _id },
      { $set: { assigned } },
      { runValidators: true },
      (err, result) => (err ? res.send({ err }) : res.send({ result }))
    );
  }

  if (completedAt !== undefined) {
    Task.updateOne(
      { _id },
      { $set: { completedAt } },
      { runValidators: true },
      (err, result) => (err ? res.send({ err }) : res.send({ result }))
    );
  }

  if (notes !== undefined) {
    Task.updateOne(
      { _id },
      { $set: { notes } },
      { runValidators: true },
      (err, result) => (err ? res.send({ err }) : res.send({ result }))
    );
  }
});

app.get("/task/:id", (req, res) => {
  Task.find({ _id: req.params.id }, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});

app.get("/task/listId/:id", (req, res) => {
  Task.find({ listId: req.params.id }, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});

app.get("/task/list/:id", (req, res) => {
  Task.find({ listId: req.params.id }, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});

app.get("/task", (req, res) => {
  Task.find({}, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});

app.delete("/task/:id", (req, res) => {
  Task.deleteOne({ _id: req.params.id }, (err, result) =>
    err ? res.send({ err }) : res.send({ result })
  );
});

app.listen(port, () => {
  console.log(`task-v1 listening on ${port}!`);
});
