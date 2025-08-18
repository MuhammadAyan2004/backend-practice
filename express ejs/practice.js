const express = require('express')
const path = require('path')

const userRouter = require('./router/userRouter')
const { hostRouter } = require('./router/hostRouter')
const rootDir = require('./utils/path')

const app = express()
app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded());
app.use(userRouter)
app.use(hostRouter)

app.use((req,res)=>{
    res.status(404).render('404',({pageTitle:'page not found'}))
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})