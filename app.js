//Add modules
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

//Initialize express app
const app = express();

//Declaring array to hold nicknames
var nicknames = [];

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

app.get('/chat-box', (req, res) => {
    res.render('chat-box', {basedir: __dirname + '/views'});
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('connect', () => {
        console.log('User connected');
    });

    socket.on('new user', (data, callback) => {
        console.log('new user entered');
        if(nicknames.indexOf(data) != -1){
            callback(false);
        }
        else{
            callback(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
        }
    });

    socket.on('chat message', (msg) => {
        console.log('message :' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

httpServer.listen(7000, () => {
    console.log('Http server running');
});