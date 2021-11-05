const express = require("express");
const router = express.Router();
const { Log } = require("../models");
const validateSession = require("../middleware/validateSession");
//const util = require('util')

// /log/ 	POST 	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
// { "log" : { "description" : "desc", "definition" : "def", "result" : "res"}}

router.post("/", validateSession, async (req, res) => {
    let { description, definition, result } = req.body.log;
    const userID = req.user.id;
    const log = {
        description: description,
        definition: definition,
        result: result,
        owner_id: userID
    }
    try {
        const newLog = await Log.create(log);
        res.status(201).json({
            message: `Logged`,
            log: log,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to log --- Error: ${error}`,
        });
    }
});

// /log/ 	GET 	Gets all logs for an individual user.

router.get("/", validateSession, async (req, res) => {
    const userID = req.user.id;
    try {
        const logs = await Log.findAll({
            where: {
                owner_id: userID
            }
        });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// /log/:id 	GET 	Gets individual logs by {{id}} for an individual user.

router.get("/:id", validateSession, async (req, res) => {
    const userID = req.user.id;
    const logID = req.params.id;
    try {
        const logs = await Log.findAll({
            where: {
                owner_id: userID,
                id: logID
            }
        });

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// /log/:id 	PUT 	Allows individual logs to be updated by a user.

router.put("/:id", validateSession, async (req, res) => {
    let { description, definition, result } = req.body.log;
    const logID = req.params.id;
    const userID = req.user.id;
    const newLog = {
        description: description,
        definition: definition,
        result: result
    }
    const query = {
        where: {
            id: logID,
            owner_id: userID
        }
    };
    try {
        const updatedLog = await Log.update(newLog, query);
        res.status(200).json({ message: 'Log updated!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// /log/:id 	DELETE 	Allows individual logs to be deleted by a user.

router.delete("/:id", validateSession, async (req, res) => {
    const logID = req.params.id;
    const userID = req.user.id;
    const query = {
        where: {
            id: logID,
            owner_id: userID
        }
    };
    try {
        await Log.destroy(query);
        res.status(200).json({ message: 'Log Deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;