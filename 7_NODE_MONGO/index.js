const MongoClient = require("mongodb").MongoClient;
const assert      = require("assert");
const url         = "mongodb://localhost:27017/";
const dbname      = "conFusion";

MongoClient.connect(url,(err,client)=>{
    // assert.equal(err,null);
    if(err){
        console.log(err);
    }
    console.log("Connected To Database");
    // select the database
    const db  = client.db(dbname)
   // select the collection
   collection = db.collection("dishes");
   collection.insertOne({"name":"Tanvir Rahman","description":"This is  a Test"},(err,result)=>{
       if(err){
           console.log(err)
       }
       console.log("After Insert\n");
       console.log(result.ops); // how many operation is done
       collection.find({}).toArray((err,docs)=>{
           if(err){
               console.log(err);
           }
           console.log("Found:\n");
           console.log(docs);
           db.dropCollection('dishes',(err,result)=>{
               if(err){
                   console.log(err);
               }else{
                   console.log("Collection is dropped");
                   client.close();
               }
           })
       })
   })
})