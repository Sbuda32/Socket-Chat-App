//Add modules
const app = require('express')();
const http = require('http');

//create http server
const httpServer = http.createServer(app);

//Set template engine and views folder
app.set('view engine', 'pug');
app.set('views', './views/');

app.get('/', (req, res) => {
    res.render('index');
});

httpServer.listen(8080, () => {
    console.log('Http server running');
});