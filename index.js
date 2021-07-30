require('dotenv').config();
require('./mongo');
const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const notFound = require('./middleware/notFound.js');
const handleErrors = require('./middleware/handleErrors');


app.use(cors());
app.use(express.json());

app.use('/',routes());

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Servidor que se ejecuta en el puerto ${PORT}`);
});

module.exports = {app, server};