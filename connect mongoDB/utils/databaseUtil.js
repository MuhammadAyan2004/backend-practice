const {MongoClient} = require('mongodb')
const mn = require('mongodb')

let mongoURL = "mongodb://127.0.0.1:27017";
let _db;

const mongoConnect = (cb)=>{
    MongoClient.connect(mongoURL)
    .then(client=>{
        cb()
        _db = client.db('airbnb')
    })
    .catch(err=>{
        console.log('error while connecting the app: ',err);
    })
}

const getdb = ()=>{
    if(!_db){
        throw new Error('db is not connected yet')
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;