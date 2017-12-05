const config = require("../config/config.json");
const mongoose = require('mongoose');

// Maak een verbinding met de mongo database
mongoose.Promise = global.Promise;
mongoose.connect(config.address);