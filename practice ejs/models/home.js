const path = require('path')
const fs = require('fs')
const dirname = require('../utils/pathUtil')
const filePath = path.join(dirname, 'data', 'home.json') 
module.exports = class home {
    constructor(houseName,price,location,rating,photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    save () {
        this.id = Math.random().toString()
        home.fetchAll((booking)=>{
            booking.push(this)
            fs.writeFile(filePath, JSON.stringify(booking),err=>{
                console.log('your err comes here', err);
            })
        })
    }
    static fetchAll(cb){
        fs.readFile(filePath,(err,data)=> {
            cb(!err ? JSON.parse(data) : [])
        })
    }   
    static findById (houseID, cb){
        home.fetchAll(home=>{
            const homeFound = home.find(hom => hom.id === houseID)
            cb(homeFound)
        })
    }
}