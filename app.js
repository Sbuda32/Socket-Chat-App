//Add modules
const app = require('express');
const http = require('http');

//create http server
http.createServer(app);

app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>');
});

http.listen(8080);