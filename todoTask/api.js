var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var TaskModel = require('./task_schema'); //Import and intancing our Schema to be sent and storaged.


let environment = null;

if (!process.env.ON_HEROKU) {
    console.log("Loading variables from files");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = {
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};

var query = 'mongodb+srv://' + environment.DBMONGOUSER + ':' + environment.DBMONGOPASS + '@' + environment.DBMONGOSERV + '/' + environment.DBMONGO + '?retryWrites=true&w=majority';

const db = (query);


mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Sucessful connection");
})
.catch((error) => {
    console.log("Error!" + error);
});

// CREATING TASKS.
/*
req = what we request and receive.
*/
router.post('/create-task', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = { //Here A Json is created. 
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task); //A new model is Created (Using SCHEMA STRUCTURE) and this one will be saved into the DB
    // THIs TASKMODEl is TIED to the DATABASE.

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send("OK\n");
        }
    });
});

router.get('/all-tasks', function (req, res) {
    TaskModel.find(function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post('/update-task', function (req, res) {
    TaskModel.updateOne({ TaskId: req.body.TaskId }, {
        Name: req.body.Name,
        Deadline: req.body.Deadline
    }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

router.delete('/delete-task', function (req, res) {
    TaskModel.deleteOne({ TaskId: req.body.TaskId }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

module.exports = router;
