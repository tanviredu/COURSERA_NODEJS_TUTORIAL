const Joi       = require("@hapi/joi");
const mongoose  = require("mongoose");
const express   = require("express");
const users     = require("./routes/users");
const config    = require("./config");
const app       = express();
const PORT      = 8000;
app.use(express.json());


app.use("/users",users);




url = config.mongoUrl;
mongoose.connect(url)
    .then(()=>{
        console.log("Connected");
        app.listen(PORT,()=>{
            console.log("Server connected");
        })
    })