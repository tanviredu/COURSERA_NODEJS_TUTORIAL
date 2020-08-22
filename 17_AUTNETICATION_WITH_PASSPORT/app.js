// database and express
const mongoose = require("mongoose");
const express  = require("express");

// passport
const passport = require("passport");
const config   = require("./config");


// session file based
const session  = require("express-session");
var FileStore  = require("session-file-store")(session)  // use the file storage as a session

// port and the server
const PORT     = 8000;                                                         // insted of memory
const app      = express();

//userRouter
const usersRouter = require("./routes/userRouter");


app.use(passport.initialize())  // init the passport
app.use(passport.session())     // passport will use the session

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the session configuration
// for file store
app.use(session({
    name: 'session-id',
    secret: '12345-3432-34-23',
    saveUninitialized : false,   // init the saving functionality
    resave :false,               // dont modify
    store : new FileStore()      // this will be the file based session not database
}));

function auth(req,res,next){
    console.log(req.user);
    if(!req.user){
        var err = Error('You are not authenticated');
        err.status = 403;
        next(err);
    }else{
        next();
    }
}

// user router must be up in the auth middleware
// otherwise you can access this
app.use('/users', usersRouter);

app.use(auth);

// this auth middle ware put every other after this
// blockedfor unauthenticated



// after this middleware every route needs
// authenticationn
// other wise it will show error
// you can use in the request
// ot like this

app.get("/protectedRoute",(req,res)=>{
   res.send("this is the protected route")
});


// database connection and server start
url = config.mongoUrl;
mongoose.connect(url)
    .then(()=>{
        console.log("Connected to the database");
        app.listen(PORT,()=>{
            console.log(`SERVER STARTED AT PORT ${PORT}`);
        })
    })


