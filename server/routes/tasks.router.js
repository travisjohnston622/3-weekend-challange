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
    const newTask = req.body;
    console.log(newTask);
    const queryString = `INSERT INTO "tasks" ("name", "date", "notes", "completed") VALUES
    ('${newTask.name}', '${newTask.date}', '${newTask.notes}', '${newTask.completed},');`;

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
    const taskId = req.params.id;
    const queryString = `DELETE FROM "tasks" WHERE "id" = ${taskId};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
    });


//PUT(update) route
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const complete = req.body.complete;
       
        let queryString = `UPDATE "tasks" SET "completed"='${completed}' WHERE "id" = $1;`;
        console.log(queryString);

        pool.query(queryString, [id])
            .then((response) => {
                res.sendStatus(201);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    });

    module.exports = router;