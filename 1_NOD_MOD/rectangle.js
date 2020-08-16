// creating a node modules
// third parameter is actually a function
// this will be called when the work is done
// the callback first parameter is error
// second is result [if there is no error]
module.exports = (x,y,callback) =>{
    if(x<=0 || y<=0 ){
        setTimeout(()=>callback(new Error("ERROR : Enter valid value"),null),2000);

    }else{
        setTimeout(()=>callback(null,{
            perimeter : (x,y)=>(2*(x+y)),
            area : (x,y)=>(x*y)
        }),2000);

    }
}






