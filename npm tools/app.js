const http = require('http');

let server = http.createServer((req,res)=>{
    console.log("hello guys");
})



const PORT = 3001
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})
