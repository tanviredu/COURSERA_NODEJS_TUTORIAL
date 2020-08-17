const express    = require("express");
const bodyParser = require("body-parser");

// mini express application
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route("/")
    .all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain");
    next();

})
    .get((req,res)=>{
    res.end("will send all the dishes to you");
})
    .post((req,res)=>{
    res.end("Will add the dish "+req.body.name + "with details " +req.body.description);
})
    .put((req,res)=>{
    res.statusCode = 403;
    res.end("put operatiion is not supported");
})
    .delete((req,res)=>{

    res.end("Deleting all the dishes");
})
dishRouter.route("/:dishId")

    .get((req,res)=>{
    res.end("will send "+req.params.dishId + "To you");
})
    .post((req,res)=>{
    res.statusCode = 403;
    res.end("Not supported")
})
    .put((req,res)=>{
    res.statusCode = 200;
    res.end("Will Update the dish "+req.params.dishId);
})
    .delete((req,res)=>{
    res.end("Deleting "+req.params.dishId);

})

module.exports = dishRouter;
