const WriteWrap = process.binding('stream_wrap').WriteWrap;
const net = require('net');
const path = require('path');
const fork = require('child_process').fork;

let workers = [];
let len = require('os').cpus().length;

const disconnect = worker => {
    return () => {
        console.log(`${process.pid} : worker ${worker.pid} is disconnected.`);
    };
};

const exit = worker => {
    return () => {
        console.log(`${process.pid} : worker ${worker.pid} exited.`);
        createWroker();
    };
};

const createWroker = () => {
    let worker = fork(path.join(__dirname, 'serverworker.js'));
    console.log(`${process.pid} : worker ${worker.pid} created.`);
    worker.on('disconnect', disconnect(worker));
    worker.on('exit', exit(worker));
    workers.push(worker);
};

for(let i = 0; i < len; i++) {
    createWroker();
}

const port = 3000;
let handle = net._createServerHandle('0.0.0.0', port);
handle.listen();
console.log(`server runnning at port: ${port}`);

handle.onconnection = function(err, handle) {
    if(err) console.err(err);
    let worker = workers.pop();
    let channel = worker._channel;
    let req = new WriteWrap();
    channel.writeUtf8String(req, 'dispatch handle', handle);
    workers.unshift(worker);
};
