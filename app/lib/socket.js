const socketIO = require('socket.io');

let setServer = (server) => {
    let io = socketIO(server);
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            console.log('Message received: ', msg);
            io.emit('chat message', msg);
        });

    })
}

module.exports = {
    setServer: setServer
}