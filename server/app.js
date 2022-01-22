const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const router = require('./router/index.js')

// --- Settings
app.set('port', 3000)

// --- Files statics
app.use(express.static(path.join(__dirname, '..', '/public')));

// --- Middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

// --- Rutas
app.use('/api', router)

module.exports = app;