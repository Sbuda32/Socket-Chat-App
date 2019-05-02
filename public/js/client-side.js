var socket = io();

socket.on('connect', () => {
    
    console.log('Connected to server');

    socket.emit('new user');

    socket.on('new user', () => {
        console.log('new user joined');
    });
    
    socket.on('new message', (msg) => {
        console.log('message: ' + msg);
    });

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});