const config          = require("../config");
const bcrypt          = require("bcrypt");
const _               = require("lodash");
const mongoose        = require("mongoose");
const {User,validate} = require("../models/User")
const express         = require("express");
const router          = express.Router()


router.post("/register",async (req,res)=>{
    const {error} = validate(req.body);
    // if validation error occurs
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // email is unique thats why search by email
    let user = await User.findOne({email:req.body.email})
    console.log(user);
    // if the user already exists
     if(user){
         return res.status(400).send("User already Registered");
     }
     console.log("user does not exist up to this point");
    // // we only take the name email and password from the req.body
     new_user = new User(_.pick(req.body,['name','email','password']));
     console.log(new_user);
    // encrypt the password
     const salt = await bcrypt.genSalt(10) // create the salt
     console.log(salt);
     // change the password property to encrypted ones
     new_user.password = await bcrypt.hash(new_user.password,salt);
     console.log(new_user);
     await new_user.save();
     console.log("saved user");
     res.send(new_user);


})


router.post("/login",async (req,res)=>{
    //  validate the req.body with joi
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // if req.body is valid
    // fetch the user from the email
    let user = await User.findOne({email:req.body.email});
    // if there is no user
    if(!user){
        return res.status(400).send("Invalid email or password")
    }
    // if there is user
    // compare the password
    const validPassword = await bcrypt.compare(req.body.password,user.password);

    // if password not mached
    if(!validPassword){
        return res.status(400).send("Invalid email or password")
    }
    // if both exists and matched
    res.send("welcome user");

})

module.exports = router;