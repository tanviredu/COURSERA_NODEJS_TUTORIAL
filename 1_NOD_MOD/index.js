// creating a javascript object
var rect = {
    peremeter : (x,y)=>(2*(x+y)),
    area: (x,y)=>(x*y)

}

function solveRect(l,b){
    console.log(`Solving for rectangle with l = ${l} and b = ${b} `);
    if(l <= 0 || b <=0){
        console.log("Dimenstion must be greater than zero");
    }else{
        console.log("Area of the rectangle is "+rect.area(l,b));
        console.log("Peremeter of the rectangle "+rect.peremeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);