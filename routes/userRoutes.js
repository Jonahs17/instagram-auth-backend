const express= require("express");
const { home, signup } = require("../controller/userController.js");
const authenticateUser = require("../middleware/authenticateUser.js");
const router= express.Router();

router.get('/',home);
router.post('/signup',authenticateUser,signup);

module.exports=router;