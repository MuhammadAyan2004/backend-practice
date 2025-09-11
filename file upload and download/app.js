const express = require('express')
const session = require('express-session')
const mongodb_Store = require('connect-mongodb-session')(session)
const multer = require('multer')
const db_Path = "mongodb://127.0.0.1:27017/airbnb"


const { userRouter } = require('./router/userRouter')
const { hostRouter } = require('./router/hostRouter')
const { authRouter } = require('./router/authRouter')
const errorController = require('./controllers/errorController')
const { default: mongoose } = require('mongoose')
const path = require('path')
const rootDir = require('./utils/pathUtil')
const app = express()

app.set('view engine','ejs')
app.set('views','views')

const store = new mongodb_Store({
    uri:db_Path,
    collection:'sessions',
})

const randomString = (length)=>{
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < length; i++){
        result += char.charAt(Math.floor(Math.random()* char.length))
    }
    return result;
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null, randomString(10) + '-' + file.originalname)
    }
})

const filefilter = (req,file,cb)=>{
    if(['image/jpeg','image/png','image/jpg'].includes(file.memtype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const options = {
    storage,
    filefilter 
}

app.use(express.urlencoded())
app.use(multer(options).single('pic'))
app.use('/uploads', express.static(path.join(rootDir,'uploads')))
app.use('/host/uploads', express.static(path.join(rootDir,'uploads')))

app.use(session({
    secret:"it's secret",
    resave:false,
    saveUninitialized:true,
    store
}))

// app.use((req,res,next)=>{
//     req.isLoggedIn = req.session.isLoggedIn;
//     next()
// })


app.use(authRouter)
app.use(userRouter)
app.use(hostRouter)
app.use(errorController.PageNotFound)
app.use('/homeList/',errorController.PageNotFound)



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