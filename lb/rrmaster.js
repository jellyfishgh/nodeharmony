const net = require('net');
const fork = require('child_process').fork;

let workers = [];
let cpuCount = require('os').cpus().length;
for (let i = 0; i < cpuCount; i++) {
    workers.push({
        order: i,
        worker: fork('./rrworker')
    });
}

let port = process.argv.slice(2)[0] || 3000;
let host = '0.0.0.0';

let workercount = {};

let handle = net._createServerHandle(host, port);
handle.listen();
console.log(`server listening at http://${host}:${port}`);
handle.onconnection = function (err, handle) {
    // Round-Robin Stragety
    let item = workers.pop();
    item.worker.send({
        'order': item.order
    }, handle);
    item.worker.on('message', (m) => {
        if (!workercount[m.pid]) {
            workercount[m.pid] = 1;
        } else {
            workercount[m.pid]++;
        }
        console.log(workercount);
    });
    workers.unshift({
        'order': 0,
        worker: item.worker
    });
};