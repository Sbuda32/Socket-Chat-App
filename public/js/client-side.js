var socket = io();

socket.on('connect', () => {
    
    console.log('Connected to server');

    socket.emit('new user');

    socket.on('new user', () => {
        console.log('new user joined');
    });
    
    socket.on('new message', (msg) => {
        
        let li = $('<li></li>');
        
        li.text('message: ' + msg);
        $('#messages').append(li);
    });

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

console.log('second last')

$(document).ready(function(){

    $('#button').click((e) => {
        $('message-form').submit();

        var text = $('[name=message]').val();
        //console.log(`message: ${text}`);

        socket.emit('new message', text);
    });
});