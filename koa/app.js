const koa = require('koa');

const app = koa();

app.use(function*(next) {
    const start = new Date();
    yield next;
    console.log(`${new Date() - start}ms`);
});
