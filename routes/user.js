const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const usercontroller = require('../controllers/user.js');
const review = require('../models/review.js');

router.get("/signup" , usercontroller.renderSignupForm);

router.post("/signup" ,  wrapAsync(usercontroller.signup));  

router.get("/login" , saveRedirectUrl,usercontroller.renderLoginForm);

router.post("/login",saveRedirectUrl ,passport.authenticate("local" , {failureRedirect:'/login' , failureFlash:true }), usercontroller.login);

router.get("/logout" , usercontroller.logout); 


module.exports = router;
