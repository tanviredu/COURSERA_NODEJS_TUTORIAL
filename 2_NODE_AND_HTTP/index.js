const http      = require("http");
const fs        = require("fs");
const path      = require("path");
const hostname  = "localhost";
const port      = 3000;

// setting up server
const server = http.createServer((req,res)=>{
    // request is coming from the browser
    console.log("Request for "+req.url+" by method " + req.method);

    if (req.method == "GET"){
        var fileUrl;
        if(req.url == "/") fileUrl = "/index.html";
        else fileUrl  = req.url;
        var filePath = path.resolve("./public"+fileUrl);
        console.log(filePath);
        const fileExt = path.extname(filePath);
        console.log(fileExt);
        if(fileExt == ".html"){
            fs.exists(filePath,(exists => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader("Content-Type","text/html");
                    res.end("<html> not exists </html>");
                    return;
                }else{
                    res.statusCode = 200;
                    res.setHeader("Content-Type","text/html");
                    fs.createReadStream(filePath).pipe(res);
                }

            }))

        }else{
            console.log("Not HTML");
        }
    }else{
        console.log("NOT GET REQUEST");

    }
})

server.listen(port,hostname,()=>{
    console.log("Server Started");
})

