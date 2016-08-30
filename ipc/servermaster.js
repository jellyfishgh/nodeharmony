const WriteWrap = process.binding('stream_wrap').WriteWrap;
const net = require('net');
const path = require('path');
const fork = require('child_process').fork;

let workers = [];
let len = require('os').cpus().length;

for(let i = 0; i < len; i++) {
    let worker = fork(path.join(__dirname, 'worker.js'));
    worker.on('disconnect', () => {
        console.log(`${process.pid} worker ${worker.pid} is disconnected.`);
    });
    worker.on('exit', () => {
        console.log(`${process.pid} worker ${worker.pid} exited.`);
    });
    workers.push(worker);
}

let handle = net._createServerHandle('0.0.0.0', 3000);
handle.listen();
handle.onconnection = function(err, handle) {
    if(err) console.err(err);
    let worker = workers.pop();
    let channel = worker._channel;
    let req = new WriteWrap();
    channel.writeUtf8String(req, 'dispatch handle', handle);
    workers.unshift(worker);
};