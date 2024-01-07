import express from "express";
import cors from "cors"
import db from "./db/db.js";

const app = express();
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    
    db.query("select version()")
    .then((result) => {
      res.status(200).send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/task", async (req, res) => {
    try {
        const result = await db.query("select id, title, done from tasks order by title");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

app.get("/task/:id", async (req, res) => {
    let taskId = req.params.id;
    try {
        const result = await db.query("select id, title, done from tasks where id = $1", [taskId]);
        
        /**
         * Never do this:
         * let q = `select id, title, done from tasks where id = ${taskId}`;
         * const result = await db.query(q);
         */
        
        if (result.rows.length === 0) {
            let error = `Task with id ${taskId} couldn't be found`;
            res.status(404).json({error});
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

app.post('/task', async (req, res) => {
    const newTask = req.body;
    
    try {
        const result = await db.query(
            "insert into tasks (title, done) values ($1, $2) returning id",
            [newTask.title, newTask.done]
        );

        Object.assign(newTask, {id: `${result.rows[0].id}`});
        res.status(200).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

app.put('/task/:id', async (req, res) => {
    let taskId = req.params.id;
    const {title, done} = {...req.body};

    if (title === "") {
        let error = "Title can't be an empty string";
        res.status(400).json({error});
        return;
    }

    try {
        const result = await db.query("select title, done from tasks where id = $1", [taskId]);
        if (result.rows[0].row_count == 0) {
            res.status(404).json({error: `Task with id ${taskId} doesn't exist`});
            return;
        }

        const existingTask = result.rows[0];
        await db.query("update tasks set title = $2, done = $3 where id = $1", 
            [taskId, title ?? existingTask.title, done ?? existingTask.done]);
            
        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }

});

app.delete("/task/:id", async (req, res) => {
    let taskId = req.params.id;

    try {
        const result = await db.query("select count(*) from tasks where id = $1", [taskId]);
        if (result.rows[0].count == 0) {
            res.status(404).json({error: `task with id ${taskId} doesn't exist`});
            return;
        }

        await db.query("delete from tasks where id = $1", [taskId])
        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

app.listen(3000, function () {
    const addressInfo = this.address();
    console.log(`Back-End server is running at http://localhost:${addressInfo.port}`);
});