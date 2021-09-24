const express = require('express');
const router = express.Router();
const { authenticateToken, authenticateRefreshToken, isAdmin } = require('../middlewares/authToken');
const authController = require('../controllers/auth');

const validationMiddleware = require('../middlewares/validation');
const { userSchema } = require('../Validations');

router.post('/register', validationMiddleware(userSchema), authController.userRegister);
router.post('/login', authController.userLogin);
router.delete('/logout', authenticateToken, authController.userLogout);

router.get('/access-token', authenticateToken, authController.accessToken);

router.post('/refresh-token', authenticateRefreshToken, authController.refreshToken)

module.exports = router