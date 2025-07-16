
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');

// GET /students
router.get('/', StudentController.index);

// GET /students/:ra
router.get('/:ra', StudentController.show);

// POST /students
router.post('/', StudentController.store);

// PUT /students/:ra
router.put('/:ra', StudentController.update);

// DELETE /students/:ra
router.delete('/:ra', StudentController.destroy);

module.exports = router;
