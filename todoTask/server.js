const express = require('express'); //INcludes libraries as dependences
const port = process.env.PORT || 3000; //Looks for an assigned port if there's not, then 3000 will be the port
const app = express();

app.listen(port, function () { //Expects conection or listeninngs with the server and the port.
    console.log("Server is listening at port: " + port);
});

app.get('/', function (req, res) { //When http request is done, this will return a HEllo WORLD
    res.send("hello world");
});

//This deploys a server.