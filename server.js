var config = require("./config/config.json");
var express = require("express");
//var routes = require('./routes/api_v1.js');

var app = express();
var requestId = 0;

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

app.use("*", function(req, res, next) {
    var date = new Date();
    console.log('[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] Captured request ' + ++ requestId);
    next();
});

//Gebruik de routers
//app.use('/api/v1', routes);

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