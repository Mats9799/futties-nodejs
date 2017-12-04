const express = require('express');
const routes = express.Router();
const Player = require('../model/player');
const app = express();

// GET ALL
routes.get('/', function(req, res) {
    res.contentType('application/json');
    Player.find({})
        .then((players) => {
            console.log(players);
            if (recipes.length <= 0) {
                res.status(204).json('There are no players yet');
            } else {
                res.status(200).json(players);
            }
        })
        .catch((error) => res.status(401).json(error));
});

module.exports = app;