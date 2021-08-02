const express = require('express');
const router = express.Router();

//importar el controlador
const usersController = require('../controllers/usersController');

module.exports = function(){

    router.get('/users', usersController.showUsers);
    router.post('/users', usersController.createUser);

    return router;
}