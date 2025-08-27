const path = require('path')
const fs = require('fs')
const dirname = require('../utils/pathUtil')
const favFilePath = path.join(dirname, 'data', 'fav.json') 

module.exports = class Favorite {
    static addToFavorite (homeId, cb){
        Favorite.getFavorites ((fav) => {
            if(fav.includes(homeId)){
                cb("home is already exixt");
            }else{
                fav.push(homeId)
                fs.writeFile(favFilePath,JSON.stringify(fav), cb)
            }
        })
    }
    static getFavorites (cb){
        fs.readFile(favFilePath, (err,data)=>{
            cb (!err ? JSON.parse(data) : []) 
        });
    }
    static removeFav(homeId,cb){
        this.getFavorites(favs=>{
            favs = favs.filter(fav => fav !== homeId)
            fs.writeFile(favFilePath,JSON.stringify(favs), cb)
        })
    }
}