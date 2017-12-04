const mongoose = require('mongoose');
const Player = require('./player');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    name: String,
    city: String,
    stadium: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'players'
    }]
});

module.exports = mongoose.model('club', clubSchema);