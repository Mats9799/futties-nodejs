const bodyParser = require('body-parser');
const config = require("../config/config.json");
const express = require("express");
const mongo = require('./mongo');
const clubRoutes = require('./api/club.routes');
const playerRoutes = require('./api/player.routes');
const app = express();

let requestId = 0;

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

// Errorhandler voor express-jwt errors
// Wordt uitgevoerd wanneer err != null; anders door naar next().
app.use(function(err, req, res, next) {
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

app.use('*', function(req, res, next) {
    var date = new Date();
    console.log('[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] Captured request ' + ++ requestId);
    next();
});

//Gebruik de players router
app.use('/api/v1', clubRoutes);
app.use('/api/v1', playerRoutes);

//Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd.
app.use('*', function(req, res) {
    res.status(404);
    res.json({
        "error": "Invalid URL"
    });
});

app.listen(config.port, function() {
    console.log("Server is listening to port " + config.port);
});

module.exports = app;