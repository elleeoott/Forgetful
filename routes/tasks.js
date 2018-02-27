const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:admin@ds127341.mlab.com:27341/forgetful_db', ['tasks']);


//Get all tasks

router.get('/tasks', function(req, res, next) {

    db.tasks.find(function(err, tasks){

        if(err){

            res.send(err);
        }

        res.json(tasks);
    });

});

//Get one task

router.get('/task/:id', function(req, res, next){

    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){

        if(err){

            res.send(err);
        }

        res.json(task);
    });
});

//Save tasks using post request

router.post('/task', function(req, res, next){

    const task = req.body;

    if(!task.title || (task.isDone + '')){

        res.status(400);
        res.json({

            "Error": "Bad request"
        });
    } else {

        db.tasks.save(task, function(err, task){
            
            if(err){

                res.send(err);
            }
    
            res.json(task);

        });
    }

});

//Delete one task

router.delete('/task/:id', function(req, res, next){

    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){

        if(err){

            res.send(err);
        }

        res.json(task);
    });
});

module.exports = router;