// when the passport initialize will use this
// script for using
var passport      = require("passport");
var LocalStrategy = require("passport-local").Strategy
var User          = require("./models/user")
passport.use(new LocalStrategy(User.authenticate()));




//serialize and deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());