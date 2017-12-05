const express = require('express');
const router = express.Router();
const Club = require('../model/club');

// Get alle clubs
router.get('/clubs', function(req, res) {
    res.contentType('application/json');
    Club.find({})
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
router.get('/clubs/:id', function(req, res) {
    res.contentType('application/json');
    Club.find({ _id: req.params.id })
        .then((clubs) => {
            if (clubs.length <= 0) {
                res.status(204).json();
            } else {
                res.status(200).json(clubs[0]);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// Post club
router.post('/clubs', function(req, res) {
    const club = new Club(req.body);
    club.save()
        .then(() => {
            res.status(200).json(club);
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        });
});

// Put club
router.put('/clubs/:id', function(req, res) {
    Club.findOneAndUpdate({_id: req.params.id}, req.body, { runValidators: true },
        function(err, result) {
            if (err) {
                return res.json(err);
            }
            res.json(result);
        });
});

// Delete club
router.delete('/clubs/:id', function(req, res) {
    Club.remove({_id: req.params.id},
        function (err, result) {
            if (err) {
                return res.send(err);
            }
            res.send(result);
        });
});

module.exports = router;