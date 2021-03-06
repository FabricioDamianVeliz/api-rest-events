const {model, Schema} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true,'Obligatory field']
    },
    name: {
        type: String,
        required: [true,'Obligatory field']
    },
    passwordHash: {
        type: String,
        required: [true,'Obligatory field']
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

userSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

userSchema.plugin(uniqueValidator);

const User = model('User',userSchema);

module.exports = User;