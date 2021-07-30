const mongoose = require('mongoose');
const {server} = require('../index');
const Vehiculo = require('../models/Vehiculo');
const {initialVehicles,api} = require('./helpers');

beforeEach(async () => {
    await Vehiculo.deleteMany({});

    //secuencial
    for(const vehicle of initialVehicles){
        const vehicleObject = new Vehiculo(vehicle);
        await vehicleObject.save();
    }
})

describe('GET all vehicles', () => {
    test('los vehiculos se devuelven en json', async () => {
        await api
            .get('/vehiculos')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    
    test('tenemos 3 vehiculos', async () => {
        
        const response = await api.get('/vehiculos');
        expect(response.body).toHaveLength(initialVehicles.length);
            
    });
    
    test('la marca de alguno de los vehiculos es correcta', async () => {
        
        const response = await api.get('/vehiculos');
        const marcas = response.body.map(vehiculo => vehiculo.marca);
        expect(marcas).toContain('Acura');
            
    });
});

describe('create a vehicle', () => {
    test('se puede agregar un vehiculo válido', async () => {
    
        const newVehicle = {
            vehiculo: "Virage Coupe 6.0 V12 490cv",
            marca: "ASTON MARTIN",
            ano: 2015,
            descripcion: "vehiculo grande",
            vendido: false
        }
    
        await api
            .post('/vehiculos')
            .send(newVehicle)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const response = await api.get('/vehiculos');
        const marcas = response.body.map(vehiculo => vehiculo.marca);
        expect(response.body).toHaveLength(initialVehicles.length+1);
        expect(marcas).toContain('ASTON MARTIN');
        
    });
    
    test('no se puede agregar un vehiculo válido', async () => {
        
        const newVehicle = {

            marca: "ASTON MARTIN",
            ano: 2015,
            descripcion: "vehiculo grande",
            vendido: false
        }
    
        await api
            .post('/vehiculos')
            .send(newVehicle)
            .expect(400)
        
        const response = await api.get('/vehiculos');
        expect(response.body).toHaveLength(initialVehicles.length);
    
    });
});

describe('delete a vehicle', () => {

    test('un vehiculo se puede borrar', async () => {
    
        const response = await api.get('/vehiculos');
        const{body: vehiculos} = response;
        const vehicleToDelete = vehiculos[0];

        await api
            .delete(`/vehiculos/${vehicleToDelete.id}`)
            .expect(204)

        const responseTwo = await api.get('/vehiculos');
        expect(responseTwo.body).toHaveLength(initialVehicles.length-1);

        const marcas = responseTwo.body.map(vehiculo => vehiculo.marca);
        expect(marcas).not.toContain(vehicleToDelete.marca);
    });

    test('un vehiculo no se puede borrar', async () => {

        await api
            .delete('/vehiculos/1234')
            .expect(400)

        const response = await api.get('/vehiculos');

        expect(response.body).toHaveLength(initialVehicles.length);

    });
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
})