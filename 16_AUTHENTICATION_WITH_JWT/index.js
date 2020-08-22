const Joi       = require("@hapi/joi");
const mongoose  = require("mongoose");
const express   = require("express");
const users     = require("./routes/users");
const config    = require("./config");
const app       = express();
const PORT      = 8000;
const session   = require("express-session");
const authentic = require("./middleware/authentic");

app.use(express.json());




//  this is the setting of the session
// copied from the doc
var sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }
   
   
app.use(session(sess))

//////////////////





app.use("/users",users);


// make a route with a middleware 
// that checks if the user is authenticated


app.get("/authenticroute",authentic,(req,res)=>{
    res.send("you are welcome");
})


url = config.mongoUrl;
mongoose.connect(url)
    .then(()=>{
        console.log("Connected");
        app.listen(PORT,()=>{
            console.log("Server connected");
        })
    })