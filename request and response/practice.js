const http = require('http')


let app = http.createServer((req,res)=>{
    function nav(name){
        res.write(`<h1>welcome to my ${name} section</h1>`)
        res.write(`<a href="home.html">home</a>
        <a href="men.html">men</a>
        <a href="women.html">women</a>
        <a href="kids.html">kids</a>
        <a href="cart.html">cart</a>`)
    }
    
    if(req.url === '/'){
        res.setHeader('content-type','text/html')
        res.write('<html>')
        res.write('<head><title>server</title></head>')
        res.write('<body>')
        nav('main')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }else if(req.url === '/home.html'){
        nav('home')
        return res.end()
    }else if(req.url === '/men.html'){
        nav('men')
        return res.end()
    }else if(req.url === '/women.html'){
        nav('women')
        return res.end()
    }else if(req.url === '/kids.html'){
        nav('kids')
        return res.end()
    }else if(req.url === '/cart.html'){
        nav('cart')
        return res.end()
    }

})
const port = 3000;

app.listen(port,()=>{
    console.log(`server running on this http://localhost:${port}`);
})