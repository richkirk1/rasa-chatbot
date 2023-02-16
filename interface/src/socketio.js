import io from 'socket.io-client';

export default function (socketUrl, customData, path) {
    const options = path ? { path } : {};
    const socket  = io(socketUrl, options);
    
    //confirm connection
    socket.on('connect', () => {
        console.log(`Connected: ${socket.id}`);
        socket.emit('session_request', {
            'session_id': socket.id,
        })
        socket.customData = customData;
    });

    //connection error
    socket.on('connect_error', (error) => {
        console.log(error);
    });

    //disconnected
    socket.on('disconnect', (reason) => {
        console.log(reason);
    });

    return socket;
}