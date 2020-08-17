const assert = require("assert");

exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.insert(document,(err,result)=>{
        assert.equal(err,null);
        // how many documents is inserted
        console.log("Inserted  "+result.result.n+" into the collection");
        // call the callback and pass the result
        // as a parameter of the function
        // this is like returning a function
        // and the result is the parameter
        // of the function
        callback(result);


    })


}

exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs)=>{
       callback(docs);
    });
}


exports.removeDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err,result)=>{
        console.log("Removed the document");
        console.log(document);
        callback(result);
    })
}

exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    coll.updateOne(document,{$set:update},null,(err,result)=>{
        assert.equal(err,null);
        console.log("Updated the document ",update);
        callback(result);
    })
}