const os = require('os');
const path = require('path');

module.exports = (sock) => {
    const tmpDir = os.tmpDir();
    let sockPath = path.join(tmpDir, sock);
    if (process.platform === 'win32') {
        sockPath = sockPath.replace(/^\//, '');
        sockPath = sockPath.replace(/\//g, '-');
        sockPath = '\\\\.\\pipe\\' + sockPath;
    }
    return sockPath;
};
