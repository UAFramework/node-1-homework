const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(cors());

const tasks = [
  {
    task: "Wash dishes",
    completed: false,
    id: "f3a19131-91e0-4e29-86f8-528d0cb00f77",
  },
  {
    task: "Do homework",
    completed: false,
    id: "65ed8efd-22c4-4364-99f3-23461c3e6c84",
  },
  {
    task: "Cooking dinner",
    completed: false,
    id: "9d72980f-a815-4624-a56b-767e6545800d",
  },
];

app.get("/tasks", function (req, res) {
  res.send(tasks);
});

app.post("/tasks", function (req, res) {
  const newTask = {
    task: req.body.title,
    completed: req.body.done || false,
    id: uuidv4(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", function (req, res) {
  const taskId = req.params.id;
  console.log(`Received PUT request for task with ID ${taskId}`);

  const updatedTask = tasks.find((task) => task.id === taskId);

  if (updatedTask) {
    updatedTask.title = req.body.title || updatedTask.title;
    updatedTask.done = req.body.done || updatedTask.done;

    res.status(200).json(updatedTask);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", function (req, res) {
  const taskId = req.params.id;
  const taskIndexToRemove = tasks.findIndex((task) => task.id === taskId);
  if (taskIndexToRemove === -1) {
    res.status(404).send("Task not found");
  } else {
    const removedTask = tasks.splice(taskIndexToRemove, 1);
    res.status(200).json(removedTask[0]);
  }
});

app.listen(3000, function () {
  console.log("Server is running");
});
