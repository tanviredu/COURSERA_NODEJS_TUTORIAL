// const session   = require("express-session");
module.exports = function (req,res,next){
    if(!req.session.isAuthenticated){
        res.status(403).send("Acccess Denied");
    }else{
        next()
        
    }

}

// TIPS : the next() must be in the else statement
// if it in the if statement
// because of nect it will execute the else too