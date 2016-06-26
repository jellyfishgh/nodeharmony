const flow = require('nimble');
const path = require('path');
const exec = require('child_process').exec;

function downloadNodeVersion(version, destination, cb) {
    // console.log(`downloading node v${version}...`);
    // var url = `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`;
    // https://nodejs.org/dist/v4.4.6/node-v4.4.6.tar.gz
    // https://nodejs.org/dist/v6.2.2/node-v6.2.2.tar.gz`
    // var filePath = path.join(destination, `${version}.tgz`);

    console.log(`downloading img ${version}`);
    var url = `http://localhost:3000/images/${version}`;
    var filePath = path.join(destination, version);
    exec(`curl ${url} > ${filePath}`, cb);
}

const imgs = ['1.jpg', '2.jpg'];

flow.series([
    function (cb) {
        flow.parallel([
            function (cb) {
                downloadNodeVersion(imgs[0], __dirname, cb);
            }, function (cb) {
                // downloadNodeVersion('6.2.2', __dirname, cb);
                downloadNodeVersion(imgs[1], __dirname, cb);
            }
        ], cb);
    },
    function (cb) {
        console.log('create archive of downloaded filed...');
        exec(`tar cvf imgs.tar ${imgs[0]} ${imgs[1]}`, (err, stdout, stderr) => {
            if(err) throw err;
            console.log('all done.');
            cb();
        });
    }
]);