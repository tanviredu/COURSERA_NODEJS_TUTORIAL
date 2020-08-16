const express    = require("express");
const http       = require("http");
const bodyParser = require("body-parser");
const dishRouter = require("./Routes/dishRouter");
const hostname   = "localhost";
const port       = 3000;
const app        = express();
app.use(bodyParser.json());


//for app.all no matter what the request type
// all will be executed for the route






app.use("/dishes",dishRouter);
app.use(express.static(__dirname+"/public"));


// next is used for adding
// additional middleware
//its optional parameter
app.use((req,res,next)=>{
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html");
    res.end("<html><body><h1>This is an express server</h1></body></html>");
})

const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log("Server Running");
})