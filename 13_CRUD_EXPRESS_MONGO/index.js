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
    //or
    // and
    // not
    // find the courses that are published
    // or course that are published by mosh
    // so its a or relation
    // for that we use or with two or([{} {}])
    // in here each object is a filter

    const courses = await Course
        .find()
        .or([{author:"Mosh"},{isPublished:true}])
        .limit(10)
        .sort({name : 1})
        .select({name:1,tags:1});
        console.log(courses);
        console.log("------------------");


}
// logicalQuery();




async function logicalQueryAnd(){
    //or
    // and
    // not
    // find the courses that are published
    // and course that are published by mosh
    // so its a and relation
    // for that we use or with two and([{} {}])
    // in here each object is a filter

    const courses = await Course
        .find()
        .and([{author:"Mosh Hamidani"},{isPublished:true}])
        .limit(10)
        .sort({name : 1})
        .select({name:1,tags:1});
    console.log(courses);


}

// logicalQueryAnd();




async function countcourse(){
    // another is count function
    // to calculate the number
    // of document
    // that is fetched
    const courses_count = await  Course
        .find({author:"Mosh Hamidani",isPublished:true})
        .limit(10)
        .sort({name:1})
        .count();
        console.log(`number of course is ${courses_count}`);


}

// countcourse();

// pagination
// get document in a given page
async function getDocumentInagivenPage(){
        // this gives you a number
        // of course based on the query
        // string
        // you can skip a number
        // when fetching data

        const courses = await Course
            .find({author:"Mosh Hamidani",isPublished:true})
            .skip(3)   // this will skip page3
            .limit(10)
            .sort({name:1})
            .select({name:1,tags:1});
        console.log(courses)


}


// to apply async and await function
// you have to always apply code blocks inside a function
async function UpdateDocument(id){
    // you need a id and the document
    // both for making an update operation
    // if you use the async and await
    // there is no then
    // its like the traditional programming

    const course = await Course.findById(id);
    if(!course){
        return;
    }else{
        course.author = "new Author";
        course.save()
        console.log(course);
    }

}


async function deleteCourse(id){
    // you cna give any pattern
    // but the best is to give the id
    // because its unique
    // _id is the object id of a document
    //1) // const result = await Course.deleteOne({_id:id});
    //2) //
    const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

// deleteCourse()




url = config.mongoUrl;
mongoose.connect(url,()=>{
    console.log("Connected with the database");
})

