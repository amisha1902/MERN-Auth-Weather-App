const router = require('express').Router();

const { signup, login, forgetPassword, resetPassword, verify } = require('../Controllers/authController')

const { signupvalidation, loginvalidation } = require('../MIddlewares/validation');


router.post('/login', loginvalidation, login);

router.post('/signup', signupvalidation, signup);

router.get('/verify/:token', verify);

router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword/:token', resetPassword);
module.exports = router;