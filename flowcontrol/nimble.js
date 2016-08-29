const flow = require('nimble');
console.log(`0 -> ${new Date().getTime()}`);
flow.series([
    function(cb) {
        setTimeout(() => {
            cb();
            console.log(`2 -> ${new Date().getTime()}`);
        }, 1000);
    },
    function(cb) {
        setTimeout(() => {
            cb();
            console.log(`3 -> ${new Date().getTime()}`);
        }, 500);
    },
    function(cb) {
        setTimeout(() => {
            cb();
            console.log(`4 -> ${new Date().getTime()}`);
        }, 100);
    }
]);
console.log(`1 -> ${new Date().getTime()}`);