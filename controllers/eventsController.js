const Vehiculo = require('../models/Vehiculo');

exports.mostrarVehiculos = async(req,res) => {
    
    const vehiculos = await Vehiculo.find({});
    
    res.json(vehiculos);
        
};

exports.crearVehiculo = async(req,res,next) => {

    const {vehiculo, marca, ano, descripcion, vendido = false} = req.body;

    if(!vehiculo || !marca || !ano || !descripcion){
        return res.status(400).json({
            error: 'Falta un campo obligatorio'
        });
    }

    const newVehiculo = new Vehiculo({

        vehiculo,
        marca,
        ano,
        descripcion,
        vendido,
        created: new Date(),
        updated: null
        
    });

    try {
        
        const savedVehiculo = await newVehiculo.save();
        res.status(201).json(savedVehiculo);
    } catch (error) {
        next(error);
    }
    
};

exports.buscarVehiculo = async(req, res, next) => {

    const {marca} = req.query
    const {ano} = req.query

    try {

        const vehiculoEncontrado = await Vehiculo.find( marca && ano ? {$and:[{marca},{ano} ]} : {$or:[{marca},{ano} ]})

        res.status(200).json(vehiculoEncontrado)


    } catch (error) {

        next(error)
    }
}

exports.mostrarVehiculoPorId = async(req,res,next) => {

    try {

        const {id} = req.params;
        const vehiculoEncontrado = await Vehiculo.findById(id);
        if(vehiculoEncontrado){
            return res.json(vehiculoEncontrado);
        }else{
            res.status(404).end();
        }
        
    } catch (error) {
        next(error);
    }
    
};

exports.modificarDatos = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        const {vehiculo, marca, ano, descripcion, vendido, updated} = req.body;

        const newVehiculo = {
            vehiculo,
            marca,
            ano,
            descripcion,
            vendido,
            updated: new Date()
        };

        const vehiculoUpdated = await Vehiculo.findByIdAndUpdate(id,newVehiculo,{new: true});
        res.json(vehiculoUpdated);

    } catch (error) {
        
        next(error);
    }

};

exports.cambiarEstadoVendido = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        const {vendido: sold} = await Vehiculo.findById(id);

        // cambiar el estado
        let estado = false;
        if(sold === estado) {
            
            estado = true;
        }else{
            estado = false;
        }
 
        const newVehiculo = {

            vendido: estado,
            updated: new Date()
        };

        const vehiculoUpdated = await Vehiculo.findByIdAndUpdate(id,newVehiculo,{new: true});
        res.json(vehiculoUpdated);
    } catch (error) {
        
        next(error);
    }
    
};

exports.borrarVehiculo = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        await Vehiculo.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        
        next(error);
    }

};