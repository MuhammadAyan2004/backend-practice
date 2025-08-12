const http = require('http');
const fs = require('fs')

let server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>AYAN Ka Server</title></head>')
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
        res.write('</html>')
        return res.end()
    }else if(req.url.toLowerCase() === '/submit-details' && req.method == 'POST'){
            fs.writeFileSync("user.txt",'maa ma agya ma')
            res.statusCode = 302;
            res.setHeader('location', '/')
        }
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>AYAN Ka Server</title></head>')
        res.write('<body><h1>welcome to my server</h1></body>')
        res.write('</html>')
        res.end()
    })



const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})