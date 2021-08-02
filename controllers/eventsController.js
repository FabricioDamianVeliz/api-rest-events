const Event = require('../models/Event');
const User = require('../models/User');
const faker = require('faker');

exports.showEvents = async(req,res) => {
    
    const events = await Event.find({});
    
    res.json(events);

    // const url = faker.image.image();
    // console.log(url);
        
};

exports.createEvent = async(req,res,next) => {

    const {title, description, dateList, place, image} = req.body;
    const {userId} = req;

    const user = await User.findById(userId);

    if(!title || !description || !dateList || !place || !image){
        return res.status(400).json({
            error: 'Falta un campo obligatorio'
        });
    }

    const newEvent = new Event({

        title,
        description,
        dateList,
        place,
        outstanding: 'No',
        image,
        user: user._id  
    });

    try {
        const savedEvent = await newEvent.save();
        user.events = user.events.concat(savedEvent._id);
        await user.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        next(error);
    }
    
};

exports.showEventById = async(req,res,next) => {

    try {

        const {id} = req.params;
        const eventFound = await Event.findById(id);
        if(eventFound){
            return res.json(eventFound);
        }else{
            res.status(404).end();
        }
        
    } catch (error) {
        next(error);
    }
    
};

exports.listOfPaginatedEvents = async(req,res,next) => {
    
    try {
        
        const { limit = 10, skip = 0 } = req.query;

        const {userId} = req;

        const [total, events] = await Promise.all([
            Event.countDocuments(),
            Event.find({user : userId}).sort({ _id: -1 }).skip(Number(skip)).limit(Number(limit))
        ]);

        return res.json({ total, events });
    } catch (error) {
        next(error);
    }
        
};

