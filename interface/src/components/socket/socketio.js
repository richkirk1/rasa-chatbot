import io from 'socket.io-client';

function getSessionID(socket) {
    const storage = localStorage;
    const storageKey = 'SESSION_ID';
    const savedID = storage.getItem(storageKey);

    if(!savedID) {
        const newID = socket.id;
        storage.setItem(storageKey, newID);
        storage.setItem('SOCKET', socket);
    }

    return savedID;
}


export default function (socketUrl, customData, path) {
    const options = path ? { path } : {};
    const socket  = io(socketUrl, options);

    if(socket.connected){
        return socket;
    }

    //confirm connection
    socket.on('connect', () => {
        console.log(`Connected: ${getSessionID(socket)}`);
        socket.emit('session_request', {
            'session_id': getSessionID(socket),
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