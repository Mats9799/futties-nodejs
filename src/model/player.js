const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    age: Number,
    height: Number,
    country: String,
    position: String,
    goals: Number,
    assists: Number
});

module.exports = mongoose.model('player', playerSchema);