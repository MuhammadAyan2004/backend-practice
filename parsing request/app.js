const http = require('http');
const requesthandler = require('./user')

let server = http.createServer(requesthandler)



const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
})
