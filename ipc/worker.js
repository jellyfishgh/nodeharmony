const WriteWrap = process.binding('stream_wrap').WriteWrap;
const channel = process._channel;

channel.ref();
channel.onread = function (length, buf) {
    if (buf) {
        console.log(buf.toString());
    } else {
        process._channel.close();
        console.log('channel closed.');
    }
};
channel.writeUtf8String(new WriteWrap(), JSON.stringify({
    'hello': 'master',
    'pid': process.pid
}), null);