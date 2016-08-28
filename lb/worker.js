const net = require('net');

process.on('message', (msg, handle) => {
    console.log(`worker: ${msg.order}`);
    start(handle);
});

let buf = 'Hello Node.js';
let res = [
    'HTTP/1.1 200 OK',
    'content-length:' + buf.length
].join('\r\n') + '\r\n\r\n' + buf;

function start(server) {
    server.listen();
    server.onconnection = function (err, handle) {
        console.log(`got a connectoin on worker, pid = ${process.pid}`);
        process.send({
            'pid':process.pid
        });
        let socket = new net.Socket({
            handle: handle
        });
        socket.readable = socket.writeable = true;
        socket.end(res);
    };
}