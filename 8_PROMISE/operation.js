/* this is promise based execution */
exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.insert(document);
    //this will return a promise
}
exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
    // return a promise
}

exports.removeDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection)
    return coll.deleteOne(document);
   // return a promise
}
exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.updateOne(document,{$set:update},null);
}