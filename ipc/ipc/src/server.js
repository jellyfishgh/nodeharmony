import Server from './lib/Server';

const server = new Server();

server.listen(() => {
    console.log('server bound');
});

const service = {
    add() {
        const args = Array.prototype.slice.call(arguments);
        return args.slice().reduce((a, b) => {
            return a + b;
        });
    },
    time() {
        const args = Array.prototype.slice.call(arguments);
        return new Promise((resolve) => {
            setTimeout(() => {
                const ret = args.slice().reduce((a, b) => {
                    return a * b;
                });
                resolve(ret);
            }, 2000);
        });
    }
};

server.on('connect', (connection) => {
    console.log('client connected');
    connection.send({
        action: 'register',
        methods: Object.keys(service)
    });
});
server.on('message', (message, client) => {
    let ret = {
        success: false,
        rid: message.rid
    };
    const method = message.method;
    if(service[method]){
        try {
            const result = service[method].apply(service, message.args);
            ret.success = true;
            if(result.then){
                return result.then((data) => {
                    ret.data = data;
                    client.send(ret);
                }).catch((err) => {
                    ret.success = false;
                    ret.error = err.message;
                    client.send(err);
                });
            }
            ret.data = result;
        }catch(err){
            ret.error = err.message;
        }
    }
    client.send(ret);
});
