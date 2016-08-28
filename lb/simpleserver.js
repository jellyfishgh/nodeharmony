const http = require('http');

const port = 3000;
const host = '192.168.1.87';

http.createServer((req, res) => {
    console.log(`${req.method} : ${req.url} from ${req.connection.remoteAddress}`);
    let body = 'hello nginx';
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body)
    });
    res.end(body);
}).listen(port, host, (err) => {
    if(err) throw err;
    console.log(`server running at http://${host}:${port}/`);
});