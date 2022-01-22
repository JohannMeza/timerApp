const { Router } = require('express');
const router = Router();
const userController = require('../controllers/AlarmController.js');
const timerController = require('../controllers/TimerController.js');
const pomodoroController = require('../controllers/PomodoroController.js')


router.get('/alarm', userController.index);
router.post('/alarm', userController.store);
router.get('/alarm/:id', userController.show);
router.put('/alarm/:id', userController.updated);
router.delete('/alarm/:id', userController.deleted);

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