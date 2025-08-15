const fs = require('fs');
const { buffer } = require('stream/consumers');

const requesthandler = (req, res) => {
    console.log(req.url, req.method);

    if (req.url === '/') {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>AYAN Ka Server</title></head>')
        res.write(`
            <body>
            <h1>Enter your details</h1>
            <form action="/submit-details" method="POST">
                <input type="text" name="username" placeholder="Enter username here"><br>
                <input type="radio" name="gender" id="male" value="male">
                <label for="male">male</label>
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">female</label><br>
                <input type="submit" value="submit">
            </form>
            </body>
            `)
        res.write('</html>')
        return res.end()
    } else if (req.url.toLowerCase() === '/submit-details' && req.method == 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
        req.on('end', () => {
            const fullbody = Buffer.concat(body).toString()
            console.log(fullbody);
            const parms = new URLSearchParams(fullbody)
            // const bodyobj = {}
            // for(const[key,val] of parms.entries()){
            //     bodyobj[key] = val
            // }
            const bodyobj = Object.fromEntries(parms)
            console.log(bodyobj);
            fs.writeFile("user.txt", JSON.stringify(bodyobj), (err) => {
                console.log('Data written successfully', err);
                res.statusCode = 302;
                res.setHeader('location', '/')
                return res.end()
            });
        })
    } else {
        res.setHeader('content-type', 'text/html')
        res.write('<html>')
        res.write('<head><title>AYAN Ka Server</title></head>')
        res.write('<body><h1>welcome to my server</h1></body>')
        res.write('</html>')
        res.end()
    }
}


module.exports = requesthandler;