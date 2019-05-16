import moment = require("moment");

//Variable to hold socket connection behaviour and properties
var socket = io();

//When client connects to socket server
socket.on('connect', () => {
    
    console.log('Connected to server'); //Print to console to confirm if client connected

    socket.emit('new user');            //Emit 'new user' event to server

    //Listen for new user connections coming from server
    socket.on('new user', () => {
        console.log('new user joined'); 

        //Message that notifies there is a new user who joined the chat app
        let $newUserNotify = "<p class='new-user-notify'>New user joined.</p>";

        //Render notification message to screen
        $('#messages').append($newUserNotify);
    });
    
    //Listen for new message coming from server
    //@param {msg} represents message data from server, sent by the user 
    socket.on('new message', (msg) => {
        
        //Message box with User Picture and the User message
        let $newMessage = $('<div class="message-box"> <div class="user-pic"></div> <div class="text-message"> <p>'+ msg + '</p> </div> </div>');
        
        //Append new message to messages in the page already
        $('#messages').append($newMessage);
    });

});

//Listen to the server disconnect
socket.on('disconnect', () => {
    console.log('Disconnected from server'); //Print message to console
});

function generateMsgObj(textMsg) {
    return {
        textMessage: textMsg,
        timestamp: moment().format()
    }
}

//Using JQuery to handle window events and the form submittion
$(document).ready(function(){

    //Adding window event listener to listen for when the enter button is clicked
    $(window).keydown((e) => {
        if(e.keyCode == 13) {
            //If enter button is clicked prevent the page from reloading
            e.preventDefault();
            $('#send-button').trigger('click');
        }
    });

    //Listen for when the send button is clicked
    $('#send-button').click((e) => {
        $('message-form').submit(); //Submit form
        
        e.preventDefault(); //Stop page from reloading

        var text = $('[name=text-box]').val();   //Get text message from text box

        var msg = generateMsgObj(text);

        console.log(`message: ${msg.textMessage}`);    //Not for production

        socket.emit('new message', msg);   //Send message to server for other users to see
    });
});