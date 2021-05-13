let port = 5000;

var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

fs.readFile('./page/acc.json', (err, data) => {
	if(err) throw err;
	var users = JSON.parse(data);
	app.post('/api', (req, res) => {
		users.push(req.body);
		console.log(`\nThe user ${req.body.username} was successfuly registered!`);
		fs.writeFile("./page/acc.json", JSON.stringify(users), function(err){
			if (err) throw err;
		});
	});
	app.post('/scr', (req, res) => {
		if(req.body.best > 1){
			console.log("\nThe server has received an object: ", req.body);
			for(let i=0; i<users.length; i++){
				if(req.body.username == users[i].username && users[i].best == 0){
					console.log(`\nThe user \"${req.body.username}\" has set his best score to ${req.body.score} for the first time!`);
					users[i].score = req.body.score;
					users[i].best = req.body.best;
					fs.writeFile('./page/acc.json', JSON.stringify(users), (err) => {
						if(err) throw err;
					});
				}
				if(req.body.username == users[i].username && req.body.best > users[i].best){
					console.log(`\nThe user \"${req.body.username}\" has not updated his best score.`);
					break;
				}
				if(req.body.username == users[i].username && req.body.best < users[i].best){
					console.log(`\nThe user \"${req.body.username}\" has updated his best score to ${req.body.score}!`);
					users[i].score = req.body.score;
					users[i].best = req.body.best;
					fs.writeFile("./page/acc.json", JSON.stringify(users), (err) => {
						if(err) throw err;
					});
					return;
				}else continue;
			}
		}
	});
})


app.use(express.static('page'));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
	console.log('\nThe server is running at port: ' +port);
});

socket.on('connection', (socket) => {
	console.log('\nConnection established.\n');
});

