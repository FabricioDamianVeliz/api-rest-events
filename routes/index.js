const express = require('express');
const router = express.Router();
const userExtractor = require('./middleware/userExtractor');

//importar el controlador
const vehiculosController = require('../controllers/vehiculosController');

module.exports = function(){

    //ruta para el home
    router.get('/',(req,res) => {
        res.send('<h1>Hola Mundo</h1>');
    });

    //rutas
    router.get('/vehiculos',vehiculosController.mostrarVehiculos);
    router.post('/vehiculos',vehiculosController.crearVehiculo);

    router.get('/vehiculos/find',vehiculosController.buscarVehiculo);

    router.get('/vehiculos/:id',vehiculosController.mostrarVehiculoPorId);
    router.put('/vehiculos/:id',vehiculosController.modificarDatos);
    router.patch('/vehiculos/:id',vehiculosController.cambiarEstadoVendido);
    router.delete('/vehiculos/:id',vehiculosController.borrarVehiculo);

    return router;
}