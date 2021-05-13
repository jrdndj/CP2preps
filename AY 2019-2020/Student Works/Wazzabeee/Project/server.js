var express = require('express');
var mongoose = require('mongoose');
var Game_Controller = require('./controllers/Game_Controller'); //allow us to call functions from Game_Controller.js
var dbFunctions = require('./controllers/DataBase_Controller'); //allow us to call functions from DataBase_Controller.js
var app = express();

//connect to database
mongoose.connect('mongodb+srv://<username>:<password>@[...]/test?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});

//set up template engine used when rendering leaderboard.html with DB data
app.set('view engine', 'ejs'); //embedded javascript templating https://ejs.co/

//static files
app.use(express.static('./public')) //we define /public as the default root for static files

//read json
app.use(express.json({limit: "1mb"})); //server recognizes data of body from POST/PUT requests


//handling requests of html pages
app.get('/', function(req,res){
    res.send("hello there | available URLs are /index /about /leaderboard /play");
});

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html');
});

app.get('/leaderboard', function(req, res){
    dbFunctions.data.GetPlayersFromDB(res);
});

app.get('/play', function(req, res){
    res.sendFile(__dirname + '/play.html');
    Game_Controller(app);
});

/*app.get('*', function(req, res){ //The 404 Route
    res.status(404).send("This page doesn't exist... Error 404");
});*/


app.listen(8080); //server starting 
console.log("listening on port 8080");
