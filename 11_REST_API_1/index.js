const express    = require("express");
const Joi        = require("@hapi/joi");
const app        = express();

app.use(express.json());

app.get("",(req,res)=>{
    res.send("Hello world");
});

app.get("/api/course",(req,res)=>{
   res.send([1,2,3]);
});

// request with parameters
app.get("/api/posts/:id",(req,res)=>{
    res.send(req.params.id);
})

// multiple parameter
app.get("/api/post/:year/:month",(req,res)=>{
    res.send(req.params.year +"/"+ req.params.month);

})

// you can send it as an object

app.get("/api/name/:fname/:lname",(req,res)=>{
    res.send(req.params);
})



// send the query parameter in the url
// like this
// http://localhost:5000/api/name/tanvir/rahman?class=1
// catch the class value
app.get("/api/query/:fname/:lname",(req,res)=>{
    console.log(req.query); // print the object
    console.log(req.query.class ); // print the value of the class

})



// make some course
// and apply finding with linq type feture

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"},
    {id:5,name:"course5"},
    {id:6,name:"course6"},
    {id:7,name:"course6"},
]

app.get("/newapi/courses",(req,res,next)=>{
    res.json(courses);
    next();
})


// get a single course
app.get("/newapi/courses/:id",(req,res)=>{
   // this is  a linq like functionality
   // in node for searching
   res.send(courses.find(c=>c.id==req.params.id));
});


//we can do the same thing with the query
// parameter;
// /api/courses?id=1
app.get("/api/courses",(req,res)=>{
    const course =  courses.find(c=>c.id==req.query.id);
    if(!course){
        res.status(404).send("This course is not find");
    }
    res.send(course);
})



// handling post request
// you post

/*
*   {
*       "name":"course name"
*   }
* */
app.post("/api/courses",(req,res)=>{
    // data should be in the body;
    const course = {
        id   :courses.length+1,
        name :req.body.name,
    };
    courses.push(course);
    res.send(course);
})


// adding validation in the api post request
// you can manually check with if else
// condition
// but best is to use a package name joi
// iss a middlewere package for the best
// so we install it with
// yarn add joi

//  make a schema that wil define the corect structure
// of the object
app.post("/valapi/course",(req, res) => {
    const schema = {
        name:Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);
    // it will show the error value
    // the value you passed
   // and promise and catch
    if(result.error){
        console.log(result.error);
        res.status(400).send(result.error.name+"\n"+result.error.details[0].message );

    }else{
        const course = {
            id   :courses.length+1,
            name :req.body.name,
        };
        courses.push(course);
        res.send(course);

    }
});

// making a put this thing you have to do
/*
*   1) look the course first
*   2) if not exist return 404
*   3) if the course exist
*       1) validate the input
*       2) if the input in valid send the error msg
*       3) if valid then update the course
*   4) return the final message with rsult
*
* */

app.put("/api/course/:id",(req,res)=>{
        // looking the course
    const course = courses.find(c=>c.id == parseInt(req.params.id));
    if(!course){
        res.status(404).send("the Course does not exists");
    }else{
        // if the course exists
        // make a validation for the updated input
        const schema = {
            name: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body,schema);
        if(result.error){
            res.status(400).send(result.error.details[0].message)
        }
        // if course exists and input is valid
        // chaning the name of the course
        course.name = req.body.name;
        res.send(course);
    }
})

// we can make a validation logic in one function and
// then we can simply pass the function

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}


app.put("/newapi/course/:id",(req,res)=>{
    // looking the course
    const course = courses.find(c=>c.id == parseInt(req.params.id));
    if(!course){
        res.status(404).send("the Course does not exists");
    }else{
        const {error} = validateCourse(req.body);
        if(error){
            res.status(400).send(error.details[0].message)
        }
        // if course exists and input is valid
        // chaning the name of the course
        course.name = req.body.name;
        res.send(course);
    }
})



// handling delete request in express
// for deleting the course
/*
*   1) look the course first
*   2) if not exist return 404
*   3) if the course exist
*       3) delete the course
*   4) return the final message with result
*
* */




app.delete("/api/course/:id",(req,res)=>{
    const course = courses.find(c=>c.id == parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course not found");

    }else{
        // if found then find the index of course
        const index = courses.indexOf(course);
        // now use the splice method to delete the course
        // 1 means delete count how many matched will get deleted
        courses.splice(index,1);
        res.send(course);
    }
})










// in some hosting your port maybe randomly assigned
// you need to write the code to catch it
// so it will catch the env port or the other port
// setting the env variable in Linux is
// this command
// $export PORT=5000
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server sarted at port ${PORT}`);
})