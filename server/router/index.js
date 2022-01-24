const { Router } = require('express');
const router = Router();
const alarmController = require('../controllers/AlarmController.js');
const timerController = require('../controllers/TimerController.js');
const pomodoroController = require('../controllers/PomodoroController.js')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', '/public/storage'))
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`)
  }
})

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file)
    const filetypes = /applicationMP3|applicationMPEG-4|applicationWAV|applicationAAC|applicationpdf/g;
    const mimeType = filetypes.test(file.mimetype.split('/').join(''))
    if (mimeType) return cb(null, true);
    cb('Error archivo incorrecto');
  }
});

router.get('/alarm', alarmController.index);
router.post('/alarm', upload.single('file'), alarmController.store);
router.get('/alarm/:id', alarmController.show);
router.put('/alarm/:id', alarmController.updated);
router.delete('/alarm/:id', alarmController.deleted);

router.get('/timer', timerController.index);
router.post('/timer', timerController.store);
router.get('/timer/:id', timerController.show);
router.put('/timer/:id', timerController.updated);
router.delete('/timer/:id', timerController.deleted);

router.get('/pomodoro', pomodoroController.index);
router.post('/pomodoro', pomodoroController.store);
router.get('/pomodoro/:id', pomodoroController.show);
router.put('/pomodoro/:id', pomodoroController.updated);
router.delete('/pomodoro/:id', pomodoroController.deleted);

module.exports = router;