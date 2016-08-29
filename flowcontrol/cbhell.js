console.log(`0 -> ${new Date().getTime()}`);
setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            console.log(`4 -> ${new Date().getTime()}`);
        }, 100);
        console.log(`3 -> ${new Date().getTime()}`);
    }, 500);
    console.log(`2 -> ${new Date().getTime()}`);
}, 1000);
console.log(`1 -> ${new Date().getTime()}`);