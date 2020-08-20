const mongoose = require("mongoose");
const config   = require("./config");

const Author = mongoose.model("Author",new mongoose.Schema({
    name   :  String,
    bio    :  String,
    website:  String
}));

const Course = mongoose.model("Course",new mongoose.Schema({
    name   : String,
    author : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Author"
    }
}))

async  function createAuthor(name,bio,website){
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save();
    console.log(result);
}

async function createCourse(name,author){
    const course = new Course({
        name,
        author
    })
    const result = await course.save();
    console.log(result);
}


async function listCourses(){
    const courses = await Course
        .find()
        .populate("author")   // author is the property of the Course model
        .select("name author");
    console.log(courses);

}

async function listCoursesFiltered(){
    const courses = await Course
        .find()
        .populate("author","name -_id")   // show only the author name without the id
        .select("name author");
    console.log(courses);

}
listCoursesFiltered()



// createAuthor("Mosh","My bio","My website")

/*result
* { _id: 5f3deb8dc2b8df334812dd6e,
  name: 'Mosh',
  bio: 'My bio',
  website: 'My website',
  __v: 0 }

* */
//add this author id to the course

//createCourse("Node Courses","5f3deb8dc2b8df334812dd6e");

// result
/*
* { _id: 5f3decb3b2e7a333dc34f3d7,
  name: 'Node Courses',
  author: 5f3deb8dc2b8df334812dd6e,
  __v: 0 }

* */

// listCourses();
url = config.mongoUrl;
mongoose.connect(url,()=>{
    console.log("Connected with the database");
})
