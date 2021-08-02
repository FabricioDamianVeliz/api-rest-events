const express = require('express');
const router = express.Router();

//importar el controlador
const loginController = require('../controllers/loginController');

module.exports = function(){

    router.post('/login', loginController.createLogin);

    return router;
}