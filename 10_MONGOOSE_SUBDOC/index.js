const mongoose = require("mongoose");
const Dishes   = require("./models/dishes");
const url      = "mongodb://localhost:27017/conFusion";
const connect  = mongoose.connect(url);

connect.then((db)=> {
    console.log("Connected to the database");
    Dishes.create({
        name: "Tanvir Rahman",
        description: "test"
    })
     .then((dish)=>{
         console.log(dish);
         return Dishes.findByIdAndUpdate(dish._id,{$set:{description:"Updated Test"}},{new:true}).exec();

     })
        .then((dish)=>{
            console.log(dish);
            dish.comment.push({
                rating:5,
                comment:"This is a test Comment",
                author:"Ornob"
            });
            return dish.save();
        })
        .then((dish)=>{
            console.log(dish);
            return Dishes.remove({});

        })
        .then(()=>{
            return mongoose.connection.close();
        })
        .catch((err)=>{
            console.log(err);
        });

});