function log(req,res,next){
    // with the req command you can manipulate this
    // incoming request
    console.log("logging....");
    next();
}

module.exports = log;