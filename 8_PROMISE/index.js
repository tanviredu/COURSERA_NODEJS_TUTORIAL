const MongoClient = require("mongodb").MongoClient;
const dboper      = require("./operation");
const url         = "mongodb://localhost:27017/";
const dbname      = "conFusion";


MongoClient.connect(url,(err,client)=> {
    if (err) {
        console.log(err);
    }
    console.log("Connected To Database");
    const db = client.db(dbname);


dboper.insertDocument(db,{name:"Tanvir",description:"This is a test"},"dishes")
    // call the promise
    // then use the "then" keyword
    // for the taking the result of the background execution
    .then((result)=>{
        console.log("Inserted Document \n",result.ops);
        return dboper.findDocuments(db,"dishes")
    })
    .then((docs)=>{
            console.log("Found Documents : \n ",docs);
            return dboper.updateDocument(db,{name:"Tanvir"},{description:"Updated Test"},"dishes");
    })
    .then((result)=>{
        console.log("Updated Document:\n",result.result);
        return dboper.findDocuments(db,"dishes");
    })
    .then((docs)=>{
        console.log("Updated Document:\n",docs);
        return db.dropCollection("dishes");
    })
    .then((result)=>{
        console.log("Dropped collection : \n",result);
        return client.close();
    })
    .catch((err)=>{
        console.log(err);
    })

});
