const express = require('express'); //INcludes libraries as dependences
const port = process.env.PORT || 3000; //Looks for an assigned port if there's not, then 3000 will be the port
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

app.use(bodyParser.json()); //wahtever thath comes here is parsed into JSon files.

app.listen(port, function () { //Expects conection or listeninngs with the server and the port.
    console.log("Server is listening at port: " + port);
});

app.get('/', function (req, res) { //When http request is done, this will return a HEllo WORLD
    res.send("hello world");
});


app.use('/api', api); //This creates a new route that listens to our port?



//This deploys a server.
