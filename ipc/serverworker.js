const net = require('net');
const channel = process._channel;

let buf = '你好 Node.js';
let res = [
    'HTTP/1.1 200 OK',
    'content-length:'+ Buffer.byteLength(buf)
].join('\r\n')+'\r\n\r\n' + buf + '\r\n';

channel.ref();
channel.onread = function(len, buf, handle) {
    console.log(`worker ${process.pid} got a connection.`);
    let socket = new net.Socket({
        handle: handle
    });
    socket.readable = socket.writable = true;
    socket.end(res);
    console.log(`worker ${process.pid} is going to disconnect.`);
    channel.close();
};
