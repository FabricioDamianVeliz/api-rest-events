const supertest = require('supertest');
const {app} = require('../index');
const User = require('../models/User');

const api = supertest(app);

const initialEvents = [
    {
        title : "EVENTO UNO",
        description : "Su descripción",
        dateList : ["2022-07-01T22:44:33.081+00:00", "2022-07-02T22:44:33.081+00:00"],
        place : "Su ubicación",
        outstanding : false,
        image : "http://#"
    },
    {
        title : "EVENTO DOS",
        description : "Su descripción",
        dateList : ["2022-07-03T22:44:33.081+00:00", "2022-07-04T22:44:33.081+00:00"],
        place : "Su ubicación",
        outstanding : false,
        image : "http://#"
    },
    {
        title : "EVENTO TRES",
        description : "Su descripción",
        dateList : ["2022-07-05T22:44:33.081+00:00", "2022-07-06T22:44:33.081+00:00"],
        place : "Su ubicación",
        outstanding : false,
        image : "http://#"
    }
]

const getUsers = async () => {
    const usersDB = await User.find({});
    return usersDB.map(user => user.toJSON());
}

module.exports = {
    initialEvents,
    api,
    getUsers
}