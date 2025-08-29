const {getdb} = require('../utils/databaseUtil');
const { ObjectId } = require('mongodb');

module.exports = class home {
    constructor(houseName,price,location,rating,photoUrl, description, _id){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = parseInt(rating);
        this.photoUrl = photoUrl;
        this.home_description = description;
        if(_id){
            this._id = _id;
        }
    }
    save () {
        const db = getdb()
        if(this._id){
            const updateField = {
                houseName:this.houseName,
                price:this.price,
                location:this.location,
                rating:this.rating,
                photoUrl:this.photoUrl,
                home_description:this.home_description
            }
            return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:updateField})
        }else{
            return db.collection('homes').insertOne(this);
        }
    }
    static fetchAll(){
        const db = getdb()
        return db.collection('homes').find().toArray();
    }   
    static findById (homeID){
        console.log(homeID);
        const db = getdb()
        return db.collection('homes').find({_id:new ObjectId(String(homeID))}).next()
    }
    static deletebyId (homeID){
        const db = getdb()
        return db.collection('homes').deleteOne({_id:new ObjectId(String(homeID))})
    }
}