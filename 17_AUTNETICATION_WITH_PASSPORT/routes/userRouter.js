const express  = require("express");
var mongoose   = require("mongoose");
var User       = require("../models/user");
var bodyParser = require("body-parser");
var passport   = require("passport");
var router     = express.Router();

router.post("/signup",(req,res,next)=>{
    var new_user = new User({
        name     : req.body.name,
        email    : req.body.email,
        password : req.body.password

    });
    User.register(new_user,(err,user)=>{
        if(err){
            res.statusCode = 500;
            res.json({err:err})
        }else{
            // other wise just authenticate the user
            passport.authenticate('local')(req,res,()=>{
                res.statusCode = 200;
                res.json({
                    success:true,
                    status: "Registration Successful"
                })
            })
        }
    })

})

router.post("/login",passport.authenticate('local'),(req,res)=>{
    res.statusCode = 200;
    res.json({
        success:true,
        status:"login Successfully"
    });
});

module.exports = router;