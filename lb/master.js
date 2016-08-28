const net = require('net');
const fork = require('child_process').fork;

let port = process.argv.slice(2)[0] || 3000;
let host = '0.0.0.0';

let handle = net._createServerHandle(host, port);
console.log(`server running at ${host}:${port}`);

let cpuCount = process.env.CPU_COUNT || require('os').cpus().length;

let workercount = {};

for (let i = 0; i < cpuCount; i++) {
    console.log(`forking ${i}`);
    const n = fork('./worker');
    n.on('message', countWorker);
    n.send({
        order: i
    }, handle);
}

function countWorker(m) {
    if (!workercount[m.pid]) {
        workercount[m.pid] = 1;
    } else {
        workercount[m.pid]++;
    }
    console.log(workercount);
}