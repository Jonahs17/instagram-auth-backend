const express= require("express");
const { signup, login, getUser } = require("../controller/userController.js");
const signUpDataValidate = require("../middleware/signupDataValidate.js");
const loginDataValidate = require("../middleware/loginDataValidate.js");
const authenticateUser = require("../middleware/authenticateUser.js");
const router= express.Router();


router.post('/signup',signUpDataValidate,signup);
router.post('/login',loginDataValidate,login);
router.get('/',authenticateUser,getUser);

module.exports=router;