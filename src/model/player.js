const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    age: Number,
    height: Number,
    country: String,
    position: String,
    goals: Number,
    assists: Number
});

module.exports = mongoose.model('player', playerSchema);