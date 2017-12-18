const express = require('express');
const router = express.Router();
const session = require('../db/neo4j');
const Player = require('../model/player');

// Get alle players
router.get('/players', function(req, res) {
    res.contentType('application/json');
    Player.find({})
        .then((players) => {
            if (players.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(players);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Get player met een bepaald id
router.get('/players/:id', function(req, res) {
    res.contentType('application/json');
    Player.find({ _id: req.params.id })
        .then((players) => {
            if (players.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(players[0]);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Post player
router.post('/players', function(req, res) {
    Player.create({
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        country: req.body.country,
        position: req.body.position,
        goals: req.body.goals,
        assists: req.body.assists
    }, function(err, result) {
        if (err) {
            return res.send(err);
        }
        console.log(result._id);
        session.run("CREATE (player:Player {id:'" + result._id + "'}) RETURN player;")
            .then(function (result) {
                session.close();
                res.send(result);
            });
    });
});

// Put player
router.put('/players/:id', function(req, res) {
    Player.findOneAndUpdate({_id: req.params.id}, req.body, { runValidators: true },
        function(err, result) {
            if (err) {
                return res.json(err);
            }
            res.json(result);
        });
});

// Delete player
router.delete('/players/:id', function(req, res) {
    Player.remove({_id: req.params.id},
        function (err, result) {
            if (err) {
                return res.send(err);
            }
            res.send(result);
        });
});

module.exports = router;