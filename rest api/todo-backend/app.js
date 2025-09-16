const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')

const db_Path = "mongodb://127.0.0.1:27017/todo"
const errorController = require('./controllers/errorController')
const todoRouter = require('./router/todoRoute')

const app = express()


app.use(express.urlencoded())
app.use(cors())
app.use(express.json())

app.use('/api/todo',todoRouter)

app.use(errorController.PageNotFound)

const port = 3001

mongoose.connect(db_Path)
    .then(()=>{
        console.log('connected to mongoDB');
        app.listen(port,()=>{
            console.log(`server is running on http://localhost:${port}`);
        })
    })
    .catch(err=>{
        console.log("mongodb wont connected yet: ",err);
    })