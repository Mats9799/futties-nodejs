const express = require('express');
const router = express.Router();
const session = require('../db/neo4j');
const Academy = require('../model/academy');

// Get alle academys
router.get('/academies', function(req, res) {
    res.contentType('application/json');
    Academy.find({})
        .then((academies) => {
            if (academies.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(academies);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Get academy van een player
router.get('/academies/:playerid', function(req, res) {
    res.contentType('application/json');
    const playerId = req.params.playerid;
    Academy.findOne({
        players: { $in: [
            playerId
        ]}
    }).then((academy) => {
        res.status(200).json(academy);
    }).catch((error) => {
        res.status(401).json(error);
    });
});

// Post academy
router.post('/academies', function(req, res) {
    const academy = new Academy(req.body);
    academy.save()
        .then(() => {
            session.run("CREATE (academy:Academy{id:'" + academy._id + "'}) RETURN academy;")
                .then(function (result) {
                    let promises = [];
                    for (let i = 0; i <= academy.players.length; i ++) {
                        promises.push(session.run("MATCH (academy:Academy{id:'" + academy._id + "'}), (player:Player{id:'" + academy.players[i] + "'}) " +
                            "CREATE (player)-[:ATTENDS]->(academy)"));
                    }
                    Promises.all(promises)
                        .then(res.status(200).json(result));
                });
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        });
});

module.exports = router;