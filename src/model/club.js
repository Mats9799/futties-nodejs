const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Club name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    academy: {
        type: Schema.Types.ObjectId,
        ref: 'academy'
    },
    city: String,
    stadium: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'player'
    }]
});

clubSchema.plugin(idValidator);

module.exports = mongoose.model('club', clubSchema);