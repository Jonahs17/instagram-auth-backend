const express= require("express");
const { home, signup, login, getUser } = require("../controller/userController.js");
const signUpDataValidate = require("../middleware/signupDataValidate.js");
const loginDataValidate = require("../middleware/loginDataValidate.js");
const { authenticateUser } = require("../middleware/authenticateUser.js");
const router= express.Router();

router.get('/',authenticateUser,getUser);
router.post('/signup',signUpDataValidate,signup);
router.post('/login',loginDataValidate,login);

module.exports=router;