const MongoClient = require("mongodb").MongoClient;
const assert      = require("assert");
const dboper      = require("./operation");
const url         = "mongodb://localhost:27017/";
const dbname      = "conFusion";



// this is the callback version of it
// then comes the promise based
// you could use the then
// or async and await


MongoClient.connect(url,(err,client)=>{
    // assert.equal(err,null);
    if(err){
        console.log(err);
    }
    console.log("Connected To Database");
    // select the database
    const db  = client.db(dbname)
   // select the collection
   // the module is sending a callback function
   // and the result as a parameter
   // you need to catch this like that
   // its like you are getting the data as a parameter of a function
    dboper.insertDocument(db,{name:"Tanvir",description:"This is  a test"},'dishes',(result)=>{
        console.log("Inserted document:\n ",result.ops);
        dboper.findDocuments(db,"dishes",(docs)=>{
            console.log("Found Documents:\n");
            console.log(docs);
            dboper.updateDocument(db,{name:"Tanvir"},{description:"Updated Test"},"dishes",(result)=>{
                console.log("Updated Document: ",result.result);
                dboper.findDocuments(db,"dishes",(docs)=>{
                    console.log("Found Documents:\n");
                    console.log(docs);
                    db.dropCollection("dishes",(result)=>{
                        console.log("Dropped Collection");
                        console.log(result);
                        client.close();
                    })
                })
            })
        })
    })

})