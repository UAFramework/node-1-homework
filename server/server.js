import express from "express";
import cors from "cors"

import { updateTask } from "./components/TaskFunctions.js";
import todos from "./components/DataStorage.js";

const app = express();
app.use(express.json())
app.use(cors())


app.get("/", function (req, res) {
    res.send("Hello!");
});

app.get("/task", function (req, res) {
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

app.delete("/task/:id", function (req, res) {
    let taskId = req.params.id;
    const idx = todos.findIndex(task => task.id === taskId);
    if (idx >= 0) {
        todos.splice(idx, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, function () {
    console.log("Server is running");
});