const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Team name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'player'
    }]
});

module.exports = mongoose.model('team', teamSchema);