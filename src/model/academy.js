const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const academySchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Academy name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'player'
    }]
});

academySchema.plugin(idValidator);

module.exports = mongoose.model('academy', academySchema);