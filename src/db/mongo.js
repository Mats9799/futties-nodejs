const config = require("../../config/config.json");
const env = require("./env.js");
const mongoose = require('mongoose');

// Maak een verbinding met de mongo database
mongoose.Promise = global.Promise;
mongoose.connect(env.dburl);