require('dotenv').config();
require('./mongo');
const express = require('express');
const routesEvents = require('./routes/events');
const routesUsers = require('./routes/users');
const routesLogin = require('./routes/login');
const app = express();
const cors = require('cors');
const notFound = require('./middleware/notFound.js');
const handleErrors = require('./middleware/handleErrors');


app.use(cors());
app.use(express.json());

app.use('/api',routesEvents());
app.use('/api',routesUsers());
app.use('/api',routesLogin());

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Servidor que se ejecuta en el puerto ${PORT}`);
});

module.exports = {app, server};