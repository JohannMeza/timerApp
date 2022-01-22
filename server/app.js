const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const router = require('./router/index.js')
const multer = require('multer')

// --- Settings
app.set('port', 3000)

// --- Files statics
app.use(express.static(path.join(__dirname, '..', '/public')));

// --- Middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '/public/storage'))
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now}.${ext}`)
  }
})

const upload = multer({ storage });

// --- Rutas
app.use('/api', upload.single('file'), router)

module.exports = app;