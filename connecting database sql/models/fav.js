const db = require('../utils/databaseUtil') 
module.exports = class Favorite {
    static addToFavorite (homeId){
        return db.execute('insert into fav values (?)',[homeId])
    }
    static getFavorites (){
        return db.execute('select h.* from fav join homes h on fav.id = h.id ')
    }
    static removeFav(homeId){
        return db.execute('delete from fav where id=?',[homeId])
    }
}