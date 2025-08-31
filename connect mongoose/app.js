const express = require('express')
const { userRouter } = require('./router/userRouter')
const { hostRouter } = require('./router/hostRouter')
const errorController = require('./controllers/errorController')
const { default: mongoose } = require('mongoose')
const app = express()

app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded())
app.use(userRouter)
app.use(hostRouter)


app.use(errorController.PageNotFound)
app.use('/homeList/',errorController.PageNotFound)

const port = 3001

mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
    .then(()=>{
        console.log('connected to mongoDB');
        app.listen(port,()=>{
            console.log(`server is running on http://localhost:${port}`);
        })
    })
    .catch(err=>{
        console.log("mongodb wont connected yet: ",err);
    })