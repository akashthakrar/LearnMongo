var array = require('lodash/array');

var MongoClient = require('mongodb').MongoClient;


function queryCollection(url,dbName,collectionName, callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var query = {};
        dbo.collection(collectionName).find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            callback(result);
        });
    });
}
 
function submission(url,dbName,collectionName,size,callback){
    queryCollection(url,dbName, collectionName, function(result){
        arrA = []
        arrB = []
        arrC = []
        for(i=0;i<21;i++){
            if(result[i]["category"]=="A"){
                arrA.push(result[i]["_id"])
            }
            else if(result[i]["category"]=="B"){
                arrB.push(result[i]["_id"])
            }
            else{
                arrC.push(result[i]["_id"])
            }
        }
        arrA = array.chunk(arrA,[size=2])
        arrB = array.chunk(arrB,[size=2])
        arrC = array.chunk(arrC,[size=2])
        //console.log(arrA)
        //console.log(arrB)
        //console.log(arrC)
        ans = { "A" : arrA , "B" : arrB , "C" : arrC }
        callback(ans)
        //You can do more stuff with the result here
    });
}


submission("mongodb://127.0.0.1","test","class",2,function(ans){
    console.log(ans)
});
