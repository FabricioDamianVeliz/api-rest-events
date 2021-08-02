const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.showUsers = async (req, res) => {

    const users = await User.find({})
    // .populate('events', {
    //     title: 1,
    //     description: 1
    // })
    ;
    res.json(users);
};

exports.createUser = async (req, res) => {

    try {
        
        const {body} = req;
        const {username, name, password} = body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            name,
            passwordHash
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {

        res.status(400).json(error);
    }
    
};

