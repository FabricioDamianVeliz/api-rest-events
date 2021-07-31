const express = require('express');
const router = express.Router();
const userExtractor = require('./middleware/userExtractor');

//importar el controlador
const eventsController = require('../controllers/eventsController');

module.exports = function(){

    //ruta para el home
    router.get('/',(req,res) => {
        res.send('<h1>Hola Mundo</h1>');
    });

    //rutas para el visitante
    router.get('/api/events', eventsController.showEvents);
    router.get('/api/events', eventsController.shareEvent);
    router.get('/api/events/:id',eventsController.showEventById);
    router.get('/api/events', eventsController.outstandingEvents);

    //rutas para el logueado
    router.get('/api/events', userExtractor, eventsController.listOfPaginatedEvents);
    router.post('/api/events', userExtractor, eventsController.createEvent);

    // router.get('/api/events/find',eventsController.buscarVehiculo);
    // router.put('/api/events/:id',eventsController.modificarDatos);
    // router.patch('/api/events/:id',eventsController.cambiarEstadoVendido);
    // router.delete('/api/events/:id',eventsController.borrarVehiculo);

    return router;
}