import Client from './Client';

const net = require('net');
const fs = require('fs');
const EventEmitter = require('events');

const sockPath = require('./filesock.js')('midway.sock');

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
