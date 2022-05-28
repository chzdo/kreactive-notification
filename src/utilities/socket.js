/**
 * @websockets
 * This function is responsible for all in app communications and notifications through Web sockets
 *
 */

function inAppChannels({ http }) {
    const socketServer = require('socket.io')(http, {
        cors: {
            orgin: '*',
        },
    });

    socketServer.on('connection', (socket) => {
        const { organizationId } = socket.handshake.query;
        const roomId = `room-${organizationId}`;
        socket.join(roomId);
        socket.on('disconnect', () => {
            socket.leave(roomId);
        });
    });
    global.socketServer = socketServer;
}

module.exports = inAppChannels;
