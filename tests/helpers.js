const supertest = require('supertest');
const {app} = require('../index');
const User = require('../models/User');

const api = supertest(app);

const initialVehicles = [
    {
        vehiculo : "Integra GS 1.8",
        marca : "Acura",
        ano : 1996,
        descripcion : "vehiculo grande",
        vendido : false
    },
    {
        vehiculo: "G-63 AMG 5.5 Bi-Turbo 32V 4x4 Aut.",
        marca: "Mercedes-Benz",
        ano: 2012,
        descripcion: "vehiculo grande",
        vendido: false
    },
    {
        vehiculo: "Polo 1.0 Mi 79cv 16V 5p",
        marca: "VW - VolksWagen",
        ano: 2005,
        descripcion: "vehiculo grande",
        vendido: false
    }
]

const getUsers = async () => {
    const usersDB = await User.find({});
    return usersDB.map(user => user.toJSON());
}

module.exports = {
    initialNotes,
    api,
    getUsers
}