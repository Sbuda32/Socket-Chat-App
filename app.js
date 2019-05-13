//Add modules
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

//Initialize express app
const app = express();

//create http server
const httpServer = http.createServer(app);

//Bring public folder on load
app.use(express.static(path.join(__dirname, '/public')));

//Initialize Socket.io
const io = socket(httpServer);

//Set template engine and views folder
app.set('view engine', 'pug');
app.set('views', './views/');

//Url to Home page/Root directory
app.get('/', (req, res) => {
    res.render('chat-box');
});

/** app.get('/chat-box', (req, res) => {
    res.render('chat-box', {basedir: __dirname + '/views'});
});*/

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new user', () => {
        console.log('new user joined');
        socket.broadcast.emit('new user');
    });

    socket.on('new message', (msg) => {
        console.log('message :' + msg);
        io.emit('new message', msg);
    });

    socket.on('connect', () => {
        console.log('User connected');
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

httpServer.listen(5000, () => {
    console.log('Http server running');
});