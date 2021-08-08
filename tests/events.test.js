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

afterAll(() => {
    mongoose.connection.close();
    server.close();
})