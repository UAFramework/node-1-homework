const express = require('express');
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.listen(3000, function () {
    console.log("Server is running");
});

const something = {
	name: "My Name",
	city: "My City",
    message: "Hi"
}

let todos = [
    { 
        title: 'Do laundry', 
        done: false, 
        id: 1
    },
    { 
        title: 'Make dinner', 
        done: true, 
        id: 2
    },
];

app.get("/", function (req, res) {
    res.send(something);
});

app.get("/todos", function (req, res) {
    res.send(todos);
});

let currentId = todos.length + 1;

app.post('/todos', function (req, res) {
    const receivedTodos = req.body;

    if (!receivedTodos.id) {
        receivedTodos.id = currentId;
        currentId++;
    }

    todos.push(receivedTodos);
    console.log(req.body);
	res.sendStatus(201);
});

function updateId (arr) {
    arr.forEach((item, index) => {
        item.id = index + 1;
        index++;
    });
    currentId = arr.length + 1;
}

app.put('/todos', function (req, res) {
    todos = todos.filter(item => !item.done);
    updateId(todos);
    res.sendStatus(200);
});

app.patch('/todos', function (req, res) {
    let todoId = req.body.id;
    todos.forEach(item => {
        if (item.id === todoId) {
            item.done = true;
        }
    });
    res.sendStatus(200);
});

let todoId;

app.delete(`/todos/:${todoId}`, function (req, res) {
    todoId = req.body.id;
    todos.forEach((item, index) => {
        if (item.id === todoId) {
            todos.splice(index, 1);
        }
    });
    updateId(todos);
    res.sendStatus(200);
});

app.patch(`/todos/:${todoId}`, function (req, res) {
    todoId = req.body.id;
    todos.forEach(item => {
        if (item.id === todoId) {
            item.title = req.body.title;
        }
    });
    res.sendStatus(200);
});