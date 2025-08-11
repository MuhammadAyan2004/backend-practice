const http = require('http');

let server = http.createServer((req,res)=>{
    console.log(req);
})


const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})