const socketIO = require('socket.io');

let setServer = (server) => {
    let io = socketIO(server);
    let myio = io.of('');
    myio.on('connection', (socket) => {
        console.log(socket)
        socket.emit('verifyUser', 'hi');
    })
}

module.exports = {
    setServer: setServer
}