const http = require('http');

let server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    res.setHeader('content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title>AYAN Ka Server</title></head>')
    if(req.url === '/'){
        res.write(`
                <body>
                <h1>Enter your details</h1>
                <form action="/submit-details" method="POST">
                    <input type="text" name="username" placeholder="Enter username here"><br>
                    <input type="radio" name="gender" id="male">
                    <label for="male">male</label>
                    <input type="radio" name="gender" id="female">
                    <label for="female">female</label><br>
                    <input type="submit" value="submit">
                </form>
                </body>
            `)
            return res.end()
        }
    res.write('<body><h1>welcome to my server</h1></body>')
    res.write('</html>')
    res.end()
})


const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})