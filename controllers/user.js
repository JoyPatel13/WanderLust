const User = require('../models/user.js');

module.exports.renderSignupForm= (req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.signup=async (req,res)=>{
    try{
        
        let {username , email ,password} = req.body;
        const newUser = new User({email , username});
        const registerdUser =await User.register(newUser , password);
        req.login(registerdUser , (err)=>{
            if(err){
                return next(err);
            }
            else{

                req.flash("success" , "Welcome to WanderLust");
                res.redirect("/listings");
            }
        });
    }catch(err){
        req.flash("error" , err.message);
        res.redirect("/signup");
    }


};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async (req,res)=>{
    req.flash("Welcome back to WanderLust! You are logged in!");
    
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout=(req,res , next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        else{
            req.flash("success" , "You have logged out!");
            res.redirect("/listings");
        }
    })
};
