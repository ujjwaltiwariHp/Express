const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// GET average age
router.get('/average-age', UserController.getAverageAge);

// DELETE users older than 25
router.delete('/delete-over-25', UserController.deleteUsersOver25);

module.exports = router;
