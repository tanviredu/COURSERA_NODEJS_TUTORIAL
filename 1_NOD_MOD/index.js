// creating a javascript object
var rect = require("./rectangle");

function solveRect(l,b){
        rect(l,b,(err,rectangle)=>{
           if(err){
               // error object has a message property
               console.log(err.message);
           } else{
               console.log(`The area ${rectangle.area(l,b)}`);
               console.log(`The perimeter ${rectangle.perimeter(l,b)}`);

           }
        });
        console.log("this line is executed early because of async");
    }


solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);