const net = require('net');
const EventEmitter = require('events');
const Parser = require('./Parser.js');

const sockPath = require('./filesock.js')('midway.sock');

class Client extends EventEmitter {
    constructor(options) {
        options = options || {};
        super();
        if (options.socket) {
            this.socket = options.socket;
        } else {
            this.socket = net.connect(sockPath);
            console.log(this.socket);
        }
        this.bind();
    }
    bind() {
        const parser = new Parser();
        this.socket('data', (buf) => {
            parser.feed(buf);
        });
        parser.on('message', (message) => {
            this.emit('message', message);
        });
        this.parser = parser;
    }
    send(message) {
        this.socket.write(this.parser.encode(message));
    }
}

module.exports = Client;
