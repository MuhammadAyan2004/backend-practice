const express = require('express')
const path = require('path')

const userRouter = require('./router/userRouter')
const hostRouter = require('./router/hostRouter')
const rootDir = require('./utils/path')

const app = express()
app.use(express.urlencoded());
app.use(userRouter)
app.use(hostRouter)

app.use((req,res)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})