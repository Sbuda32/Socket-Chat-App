//Add modules
const app = require('express')();
const http = require('http');

//create http server
const httpServer = http.createServer(app);

//Set template engine and views folder
app.use('views engine', 'pug');
app.use('views', '/views/');

app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>');
});

httpServer.listen(8080, () => {
    console.log('Http server running');
});