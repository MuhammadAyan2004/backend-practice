
const db = require('../utils/databaseUtil') 

module.exports = class home {
    constructor(houseName,price,location,rating,photoUrl, description, id){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = parseInt(rating);
        this.photoUrl = photoUrl;
        this.home_description = description;
        this.id = id;
    }
    save () {
        return db.execute('insert into homes(houseName,price,location,rating,photoUrl,home_description) values (?,?,?,?,?,?)',[this.houseName, this.price, this.location, this.rating, this.photoUrl, this.home_description])
    }
    static updatehome(homeID,registerHome){
        return db.execute('update homes set houseName=?,price=?,location=?,rating=?,photoUrl=?,home_description=? where id=?',[registerHome.houseName, registerHome.price, registerHome.location, registerHome.rating, registerHome.photoUrl, registerHome.home_description,homeID]) 
    }
    static fetchAll(){
        return db.execute("select * from homes")
    }   
    static findById (homeID){
        return db.execute("select * from homes where id=?",[homeID])
    }
    static deletebyId (homeID){
        return db.execute("delete from homes where id=?",[homeID])
    }
}