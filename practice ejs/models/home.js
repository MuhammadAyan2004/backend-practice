const path = require('path')
const fs = require('fs')
const dirname = require('../utils/pathUtil')
const Favorite = require('./fav')
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
        home.fetchAll((booking)=>{
            if (this.id) {
                booking = booking.map(home=> home.id === this.id ? this : home)
            } else {
                this.id = Math.random().toString()
                booking.push(this)
            }
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
    static deletebyId (homeId,cb){
        this.fetchAll(homes =>{
            homes = homes.filter(home => home.id !== homeId );
            fs.writeFile(filePath, JSON.stringify(homes),err =>{
                Favorite.removeFav(homeId,cb)
            })
        })
    }
}