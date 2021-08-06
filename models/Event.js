const {model, Schema} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new Schema({
    
    title: {
        type: String,
        unique: true,
        required: [true,'Obligatory field']
    },
    description: {
        type: String,
        required: [true,'Obligatory field']
    },
    dateList: {
        type: [Date],
        required: [true,'Obligatory field']
    },
    place: {
        type: String,
        required: [true,'Obligatory field']
    },
    outstanding: {
        type: Boolean,
        required: [true,'Obligatory field']
    },
    image: {
        type: String,
        required: [true,'Obligatory field']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

eventSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

eventSchema.plugin(uniqueValidator);

const Event = model('Event',eventSchema);

module.exports = Event;