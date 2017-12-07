const express = require('express');
const router = express.Router();
const Team = require('../model/team');

// Get alle teams
router.get('/teams', function(req, res) {
    res.contentType('application/json');
    Team.find({})
        .then((clubs) => {
            if (clubs.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(clubs);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Get club met een bepaald id
router.get('/teams/:id', function(req, res) {
    res.contentType('application/json');
    Team.find({ _id: req.params.id })
        .then((clubs) => {
            if (clubs.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(clubs[0]);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Post team
router.post('/teams', function(req, res) {
    const team = new Team(req.body);
    team.save()
        .then(() => {
            res.status(200).json(team);
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        });
});

// Put team
router.put('/teams/:id', function(req, res) {
    Team.findOneAndUpdate({_id: req.params.id}, req.body, { runValidators: true },
        function(err, result) {
            if (err) {
                return res.json(err);
            }
            res.json(result);
        });
});

// Delete team
router.delete('/teams/:id', function(req, res) {
    Team.remove({_id: req.params.id},
        function (err, result) {
            if (err) {
                return res.send(err);
            }
            res.send(result);
        });
});

module.exports = router;