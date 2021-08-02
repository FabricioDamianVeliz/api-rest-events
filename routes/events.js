const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');

//importar el controlador
const eventsController = require('../controllers/eventsController');

module.exports = function(){

    //ruta para el home
    router.get('/',(req,res) => {
        res.send('<h1>Hola Mundo</h1>');
    });

    //rutas para el visitante
    router.get('/events', eventsController.showEvents);
    // router.get('/api/events', eventsController.shareEvent);
    router.get('/events/:id',eventsController.showEventById);
    // router.get('/api/events', eventsController.outstandingEvents);
    
    //rutas para el logueado
    router.get('/events', userExtractor, eventsController.listOfPaginatedEvents);
    router.post('/events', userExtractor, eventsController.createEvent);

    return router;
}