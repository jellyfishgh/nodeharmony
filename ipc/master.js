const WriteWrap = process.binding('stream_wrap').WriteWrap;
const cp = require('child_process');
const path = require('path');

let worker = cp.fork(path.join(__dirname, 'worker.js'));
let channel = worker._channel;

channel.onread = function (length, buf) {
    if (buf) {
        console.log(buf.toString());
        channel.close();
    } else {
        channel.close();
        console.log('channel closed');
    }
};

channel.writeUtf8String(new WriteWrap(), JSON.stringify({
    'hello': 'worker',
    'pid': process.pid
}), null);