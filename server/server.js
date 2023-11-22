const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());


const generateUniqueId = () => {
  let scale = 5;
  return Math.floor(Math.random() * Math.pow(10, scale)) + Math.pow(10, scale); // @todo
};


const todoTasks = [
  {
    id: generateUniqueId(),
    details: { task: "Wash the dishes", completed: false, deadline: "05/16/2024" }
  },
  {
    id: generateUniqueId(),
    details: { task: "Do the shopping", completed: false, deadline: "05/16/2024" }
  },
];

// API Endpoints
app.get('/task', (req, res) => {
  res.json(todoTasks);
});

app.post('/task', (req, res) => {
  const newTask = {
    id: generateUniqueId(),
    details: req.body.details,
  };

  todoTasks.push(newTask);

  res.json(newTask);
});

app.put('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = todoTasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    todoTasks[taskIndex].details = req.body.details;
    res.send('OK');
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = todoTasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    todoTasks.splice(taskIndex, 1);
    res.send('OK');
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
