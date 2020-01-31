const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET route
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "tasks" ORDER BY "id" ASC;`)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

//POST route
router.post('/', (req, res) => {
    const newTasks = req.body;
    console.log(newTasks);
    newTasks.completed = false;
    const queryString = `INSERT INTO "tasks" ("task", "date", "notes", "completed") VALUES
    ($1, $2, $3, $4);`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

//DELETE route
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const tasksId = req.params.id;
    const queryString = `DELETE FROM "tasks" WHERE "id" = $1;`;

    pool.query(queryString [tasksId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});


//PUT(update) route
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const updateTask = req.body;

    const queryString = `UPDATE "tasks" SET "completed"=$1 WHERE "id" = $$2;`;
    console.log(queryString);

    pool.query(queryString, [updateTask.completed, taskId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;