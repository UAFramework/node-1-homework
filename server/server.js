const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())


const todos = [
  {
    title: 'Do laundry',
    done: false,
    id: '1702899098231'
  },
  {
   title: 'Make dinner',
    done: true,
    id: '1702899097854'
  }
];

function updateTask(existingTask, updatedTask) {
    // existingTask.title = updatedTask.title;
    // existingTask.done = updatedTask.done;
    Object.assign(existingTask, updatedTask)
}


app.get('/', function(req, res) {
    res.send('Hello!');
})

app.get('/task', function (req, res){
    res.send(todos);
});
app.post('/task', function (req, res) {
    const newTask = req.body;

    Object.assign(newTask, {id: `${new Date().getTime()}`});

    todos.push(newTask);
    console.log("new task:", newTask);
    res.status(201).send(newTask);
});

app.put('/task/:id', function (req, res) {
    let taskId = req.params.id;
    const updatedTask = req.body;
    const existingTask = todos.find(task => task.id === taskId);
    if (existingTask != null) {
        updateTask(existingTask, updatedTask);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
    
});

app.delete('/task/:id', function(req, res) {
    let taskId = req.params.id;
    const idx = task.findIndex(task => task.id === taskId);
    // const idx = tasks.findIndex(task => task.id === taskId);
    if(idx >=0) {
        todos.splice(idx, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }     
});

app.listen(3000, function (){
    console.log('Server is running');
});



















// const express = require("express");
// const app = express();
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");

// app.use(express.json());
// app.use(cors());

// const tasks = [];

// app.listen(3000, function () {
//   console.log("Server is running");
// });

// app.get("/tasks", function (req, res) {
//   res.send(tasks);
// });

// app.post("/tasks", function (req, res) {
//   const newTask = {
//     id: uuidv4(),
//     title: req.body.title,
//     done: req.body.done || false,
//   };

//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// app.put("/tasks/:id", function (req, res) {
//   const taskId = req.params.id;
//   const updatedTaskIndex = tasks.findIndex((task) => task.id === taskId);

//   if (updatedTaskIndex !== -1) {
//     tasks[updatedTaskIndex].title =
//       req.body.title || tasks[updatedTaskIndex].title;
//     tasks[updatedTaskIndex].done =
//       req.body.done || tasks[updatedTaskIndex].done;

//     res.status(200).json(tasks[updatedTaskIndex]);
//   } else {
//     res.status(404).send("Task not found");
//   }
// });

// app.delete("/tasks/:id", function (req, res) {
//   const taskId = req.params.id;
//   const taskIndexToRemove = tasks.findIndex((task) => task.id === taskId);

//   if (taskIndexToRemove !== -1) {
//     const removedTask = tasks.splice(taskIndexToRemove, 1);
//     res.status(200).json(removedTask[0]);
//   } else {
//     res.status(404).send("Task not found");
//   }
// });

// app.listen(3000, function () {
//   console.log("Server is running");
// });