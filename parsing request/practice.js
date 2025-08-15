const http = require('http')
const fs = require('fs')

let server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.setHeader('content-type', 'text/html')
    if (req.url === '/') {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>calculator</title></head>')
        res.write(`<body><h1>welcome to the backend type calculator</h1><br>
            <a href="calculate.html">calculator page</a></body>`)
        res.write('</html>')
        return res.end()
    } else if (req.url === '/calculate.html') {
        res.write('<html>')
        res.write('<head><title>calculator</title></head>')
        res.write(`<body><form action="calculate-result.html" method="POST">
        <input type="text" placeholder="write any number want to add" name="num1"><br>
        <input type="text" placeholder="write any number want to add" name="num2"><br>
        <button>sum</button>
        </form></body>`)
        res.write('</html>')
        return res.end()
    } else if (req.url.toLowerCase() === '/calculate-result.html' && req.method === 'POST') {

        const rawData = []
        req.on('data',(chunk)=>{
            console.log(chunk);
            rawData.push(chunk)
        })
        req.on('end',()=>{
            let strRaw = Buffer.concat(rawData).toString()
            let params = new URLSearchParams(strRaw)
            let finalObj = Object.fromEntries(params)
            console.log(finalObj);
            let nums1 = parseFloat(finalObj.num1)
            let nums2 = parseFloat(finalObj.num2)
            let sum = nums1 + nums2;

            res.write(`<html>
            <head><title>calculator</title></head>
            <body><h1>your result of the two given number is: ${sum}</h1></body>
            </html>`)
            fs.writeFileSync("answer.txt", `your result of the two given number is: ${sum}`)
            res.statusCode = 302
            return res.end()
        });
    }
    return
})

let port = 3001;
server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})