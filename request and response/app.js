const http = require('http');

let server = http.createServer((req,res)=>{
    // console.log(req.url, req.method, req.headers);
    res.setHeader('content-type','text/html')
    res.write('<html>')
    res.write('<head><title>AYAN Ka Server</title></head>')
    if(req.url === '/'){
        res.write('<body><h1>Welcome to home baby</h1></body>')
        return res.end()
    }else if (req.url.toLowerCase() === '/products'){
        res.write('<body><h1>Welcome to my products section</h1></body>')
        return res.end()
    }
    res.write('<body><h1>Welcome to my first server response</h1></body>')
    res.write('</html>')
    res.end()
})


const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})