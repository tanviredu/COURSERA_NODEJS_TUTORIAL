const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name   : {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    // make a enum validator
    category:{
        type:String,

        enum: ["web_dev",'mobile_dev','network_dev']
    },
    author : String,

    // making a custom validator
    // so every course must have  a valid tags

    tags   : {
        type:Array,
        validate:{
            validator:function(v){
                // v cant be null and a valid value
                return v && v.length >0;

            },
            message:"Course should have a valid tags"
        }
    },
    date   : {
      type : Date,
   default : Date.now()
    },
    isPublished:Boolean,
    // make sure price is only needed
    // if the published is true
    // you need to make a custom validation here
    // it can be boolean or a function that returns
    // a boolean
    // remember arrow function will not work
    price:{
        type:Number,
        required: function(){
            return this.isPublished;
        },
        min:10,
        max:200
    }
});

const Course = mongoose.model("Course",courseSchema)

module.exports = Course;