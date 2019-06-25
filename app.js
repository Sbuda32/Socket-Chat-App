//Add modules
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const moment = require('moment');

//Initialize express app
const app = express();

//create http server
const httpServer = http.createServer(app);

//Bring public folder on load
app.use(express.static(path.join(__dirname, '/public/')));

//Initialize Socket.io
const io = socket(httpServer);

//Set template engine and views folder
app.set('view engine', 'pug');
app.set('views', './views/');

//Url to Home page/Root directory
app.get('/', (req, res) => {
    res.render('chat-box');
});

//This listens for a client socket
io.on('connection', (socket) => {
    console.log('user connected');

    //Function listens for new user who just joined the chat app
    socket.on('new user', () => {
        console.log('new user joined');
        socket.broadcast.emit('new user'); //send notification that a new user has joined
    });

    //Listen for messages coming from client side
    socket.on('new message', (msg) => {
        console.log('message :' + msg.textMessage);
        io.emit('new message', msg); //Send user message to other users to view in chat page
    });

    //Print to console when connection is established -- Not for production
    socket.on('connect', () => {
        console.log('User connected');
    });

    //Print to console when client disconnects
    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

//Host app loacl at port 5000
httpServer.listen(process.env.PORT || 5000, () => {
    console.log('Http server running at http://localhost:5000');
});