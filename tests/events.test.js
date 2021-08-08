const mongoose = require('mongoose');
const {server} = require('../index');
const Event = require('../models/Event');
const {initialEvents,api} = require('./helpers');

beforeEach(async () => {
    await Event.deleteMany({});

    //secuencial
    for(const event of initialEvents){
        const eventObject = new Event(event);
        await eventObject.save();
    }
})

describe('obtener todos los eventos', () => {
    test('los eventos se devuelven en json', async () => {
        await api
            .get('/api/events')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    
    test('tenemos 3 eventos', async () => {
        
        const response = await api.get('/api/events');
        expect(response.body).toHaveLength(initialEvents.length);
            
    });
    
    test('el titulo de alguno de los eventos es correcto', async () => {
        
        const response = await api.get('/api/events');
        const titles = response.body.map(event => event.title);
        expect(titles).toContain('EVENTO UNO');
            
    });
});

describe('crear un evento', () => {
    test('se puede agregar un evento válido', async () => {
    
        const newEvent = {
            title : "EVENTO CUATRO",
            description : "Su descripción",
            dateList : ["2022-07-07T22:44:33.081+00:00", "2022-07-08T22:44:33.081+00:00"],
            place : "Su ubicación",
            outstanding : false,
            image : "http://#"
        }
    
        await api
            .post('/api/events-login')
            .send(newEvent)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const response = await api.get('/api/events');
        const titles = response.body.map(event => event.title);
        expect(response.body).toHaveLength(initialEvents.length+1);
        expect(titles).toContain('EVENTO CUATRO');
        
    });
    
    test('no se puede agregar un evento válido', async () => {
        
        const newEvent = {
            title : "EVENTO CINCO",
            dateList : ["2022-07-09T22:44:33.081+00:00", "2022-07-10T22:44:33.081+00:00"],
            place : "Su ubicación",
            outstanding : false,
            image : "http://#"
        }
    
        await api
            .post('/api/events-login')
            .send(newEvent)
            .expect(400)
        
        const response = await api.get('/api/events');
        expect(response.body).toHaveLength(initialEvents.length);
    
    });
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
})