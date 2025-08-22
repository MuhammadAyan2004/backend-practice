const express = require('express')
const { userRouter } = require('./router/userRouter')
const { hostRouter } = require('./router/hostRouter')
const errorController = require('./controllers/errorController')
const app = express()

app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded())
app.use(userRouter)
app.use(hostRouter)


app.use(errorController.PageNotFound)


const port = 3001
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})