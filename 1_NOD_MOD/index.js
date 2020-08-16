// creating a javascript object
var rect = require("./rectangle");

function solveRect(l,b){
    console.log(`Solving for rectangle with l = ${l} and b = ${b} `);
    if(l <= 0 || b <=0){
        console.log("Dimenstion must be greater than zero");
    }else{
        console.log("Area of the rectangle is "+rect.area(l,b));
        console.log("Peremeter of the rectangle "+rect.perimeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);