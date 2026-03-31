const express = require('express');
const { login, isAuthenticated, logout } = require('../controllers/authController');
const isAuthorised = require('../middlewares/isAuthorised');
const router = express.Router();

router.post('/login', login);
router.get('/is-authenticated', isAuthorised, isAuthenticated);
router.post('/logout', isAuthorised, logout);

module.exports = router;