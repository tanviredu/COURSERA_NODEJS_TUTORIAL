const mongoose = require("mongoose");
const Schema  = mongoose.Schema
const passportlocalMongoose = require("passport-local-mongoose");
// use the passport-local-monggose
// that will give us the authenticate
// method
const User = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:10,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
User.plugin(passportlocalMongoose);
module.exports = mongoose.model('Users',User);