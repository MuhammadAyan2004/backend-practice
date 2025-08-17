// external module
const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.get('/',(req,res)=>{
    console.log("i'm first middleware",req.url,req.method);
    res.send(`<h1>welcome to my server</h1>
        <a href="contact-us.html">form</a>
    `)
})
app.get('/contact-us.html',(req,res)=>{
    console.log("i'm contact-us middleware",req.url,req.method);
    res.send(`<h1>Contact us</h1>
        <form action="contact-us" method='post'>
        <input type='text' name='username' placeholder='place your name'>
        <input type='email' name='email' placeholder='place your email'>
        <button>submit</button>
        </form>
    `)
})
// old method of parsing the data
// app.use(bodyparser.urlencoded())
// express method of parsing the data
app.use(express.urlencoded({extended:true}))

app.post('/contact-us',(req,res)=>{
    console.log("your form is succesfully submitted",req.url,req.method,req.body);
    res.send(`<h1>you form is successfully submitted</h1>
        <a href="/">home</a>
    `)
})



const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})
