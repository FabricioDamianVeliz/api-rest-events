const Event = require('../models/Event');
const User = require('../models/User');
const faker = require('faker');

exports.showEvents = async(req,res,next) => {
    
    try {

        const events = await Event.find({}).sort({dateList: 1});

        res.json(events);
        
    } catch (error) {
        next(error);
    }
    // const url = faker.image.image();
    // console.log(url);     
};

exports.createEvent = async(req,res,next) => {

    try {

        const {title, description, dateList, place, outstanding = false, image} = req.body;
        const {userId} = req;

        const user = await User.findById(userId);

        if(!title || !description || !dateList || !place || !image){
            return res.status(400).json({
                error: 'Falta un campo obligatorio'
            });
        }

        let flag = 0;

        dateList.forEach(date => {

            if(!(new Date(date).getTime() > new Date().getTime())){
                flag = 1;
            }
            
        });

        if(flag === 1){
            return res.status(400).json({
                error: 'the date is not correct'
            });
        }

        dateList.sort();
        
        const newEvent = new Event({

            title,
            description,
            dateList,
            place,
            outstanding,
            image,
            user: user._id  
        });

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

exports.shareEvent = async(req,res,next) => {
    
    try {

        const {id} = req.params;
        const {_id,title,dateList} = await Event.findById(id);
        const url = `http://${req.headers.host}/api/events/${_id}`;
        const share = {
            share : ` Iré al ${title} @ ${dateList[0]} ${url} `
        };
        res.json(share);
        // console.log(share);
        
    } catch (error) {
        next(error);
    }
        
};

exports.outstandingEvents = async(req,res,next) => {
    

    try {

        const events = await Event.find({outstanding : true}).sort({ _id: -1 });

        res.json(events);
        
    } catch (error) {
        next(error);
    }
        
};



