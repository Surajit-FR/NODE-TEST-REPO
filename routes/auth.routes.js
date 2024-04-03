const express = require('express');
const router = express.Router();
const { HandleLoginError, DuplicateUserCheck } = require('../middleware/AuthValidation');
const AuthController = require('../controller/AuthController');
const ValidateUser = require('../helpers/ValidateUser');
const ModelAuth = require('../middleware/ModelAuth');


router.post('/login', [HandleLoginError], AuthController.Login);
router.post('/register', [ModelAuth(ValidateUser), DuplicateUserCheck], AuthController.Register);


module.exports = router;