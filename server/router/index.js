const { Router } = require('express');
const router = Router();
const userController = require('../controllers/AlarmController.js')

router.get('/alarm', userController.index);
router.post('/alarm', userController.store);
router.get('/alarm/:id', userController.show);
router.put('/alarm/:id', userController.updated);
router.delete('/alarm/:id', userController.deleted);

module.exports = router;