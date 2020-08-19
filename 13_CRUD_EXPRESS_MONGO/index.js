/*
*   connect to the mongo db first
*/
const mongoose = require("mongoose")
const config   = require("./config");
const Course   = require("./models/courseSchema");


// create a new Course
async function createCourse(){
    const course = new Course({
        name   :"Node.js Course",
        author : "Mosh Hamidani",
        tags   : ["node","backend"],
        isPublished:true

    })
    // you can only defines await
    // inside a async function
    //const result = await course.save();
    //console.log(result);

}
async function createAnotherCourse(){
    const course = new Course({
        name   :"Angular Course",
        author : "Mosh Hamidani",
        tags   : ["angular","frontend"],
        isPublished:true


    })
    // you can only defines await
    // inside a async function
    const result = await course.save();
    console.log(result);

}

// C IN CRUD
//createAnotherCourse();
//createCourse();

// R in CRUD
async function getCourses(){
    const courses = await Course.find({});
    console.log(courses);
}
// getCourses();

// get course
// by parameter

async function getSpecficCourse(){
    const courses = await Course.find({
        author:"Mosh Hamidani",
        isPublished:true
    }).limit(10).sort({name:1})  // -1 for descending
        .select({name:1,tags:1})
    console.log(courses);
}
// getSpecficCourse();

async function advanceQuery(){
    /*
    *   eq is for (equal)
    *   ne is for (not equal)
    *   gt is for (greater than)
    *   lt is for (less then)
    *   gte is for (greater than or equal)
    *   lte is for (less than or equal)
    *   in is for (in a array of a collection)
    *   nin is for (not in)
    * */

    const courses = await Course
        // greater than equal 10 less then equal 20
        // .find({price: {$gte : 10,$lte:20}})
        // find in the array
        // .find({price : {$in:[10,15,20]}})
        .find({})
        .limit(10)
        .sort({name:1})
        .select({name:1,tags:1});
    console.log(courses);
}
// advanceQuery();


async function logicalQuery(){

}

async function countcourse(){

}

// pagination
// get document in a given page
async function getDocumentInagivenPage(){

}



url = config.mongoUrl;
mongoose.connect(url,()=>{
    console.log("Connected with the database");
})

