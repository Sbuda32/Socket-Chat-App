//Add modules
const express = require('express');
const http = require('http');
const socket = require('socket.io');

//Initialize express app
const app = express();

//create http server
const httpServer = http.createServer(app);

//Bring public folder on load
app.use(express.static('/public'));

//Initialize Socket.io
const io = socket(httpServer);

//Set template engine and views folder
app.set('view engine', 'pug');
app.set('views', './views/');

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('user connected');
});

httpServer.listen(7000, () => {
    console.log('Http server running');
});