const path = require('path');
const net = require('net');
const fs = require('fs');
const EventEmitter = require('events');
const os = require('os');
const Client = require('./Client.js');

const tmpDir = os.tmpDir();
let sockPath = path.join(tmpDir, 'midway.sock');

if(process.platform === 'win32') {
    sockPath = sockPath.replace(/^\//, '');
    sockPath = sockPath.replace(/\//g, '-');
    sockPath = '\\\\.\\pipe\\' + sockPath;
}

class Server extends EventEmitter {
    constructor() {
        super();
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }
    listen(callback) {
        if(fs.existsSync(sockPath)){
            fs.unlinkSync(sockPath);
        }
        this.server.listen(sockPath, callback);
    }
    handleConnection(socket) {
        const client = new Client({
            socket: socket
        });
        client.on('message', (message) => {
            this.handleRequest(message, client);
        });
        this.emit('connect', client);
    }
    handleRequest(message, client) {
        this.emit('message', message, client);
    }
}

module.exports = Server;