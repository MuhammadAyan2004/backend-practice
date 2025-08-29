const { ObjectId } = require("mongodb");
const { getdb } = require("../utils/databaseUtil")

module.exports = class Favorite {
    static addToFavorite (homeId){
        const db = getdb();
        return db.collection('fav').insertOne({_id:new ObjectId(String(homeId))}) 
    }
    static async getFavorites (){
        const db = getdb();
        const favs = await db.collection('fav').find().toArray();
        const favId = favs.map(f => f._id);
        const homes = await db.collection('homes').find({_id:{$in:favId}}).toArray();
        return homes;
    }
    static removeFav(homeId){
        const db = getdb();
        return db.collection('fav').deleteOne({_id:new ObjectId(String(homeId))})
    }
}