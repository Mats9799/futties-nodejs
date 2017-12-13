const bodyParser = require('body-parser');
const config = require("../src/db/env");
const express = require("express");
const mongo = require('./db/mongo');
const clubRoutes = require('./api/club.routes');
const playerRoutes = require('./api/player.routes');
const teamRoutes = require('./api/team.routes');
const app = express();

let requestId = 0;

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

// CORS headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

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
app.use('/api/v1', teamRoutes);

//Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd.
app.use('*', function(req, res) {
    res.status(404);
    res.json({
        "error": "Invalid URL"
    });
});

app.listen(config.env.webPort, function() {
    console.log("Server is listening to port " + config.env.webPort);
});

module.exports = app;