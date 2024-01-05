const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(cors());

let generateUniqueId = () => {
    return uuidv4();
  };

const todos = [
    {
      title: 'Do laundry',
      done: 'false',
      id: `${generateUniqueId()}`
    },
    {
     title: 'Make dinner',
      done: 'true',
      id: `${generateUniqueId()}`
    }
  ];
  
  function updateTask(existingTask, updatedTask) {
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
  
      Object.assign(newTask, {id: `${generateUniqueId()}`});
  
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
