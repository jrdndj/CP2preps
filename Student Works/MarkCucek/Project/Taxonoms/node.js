var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
console.log('request was made: ' + req.url);
res.writeHead(200, {'Content-Type': 'text/html'});
var myReadStream = fs.createReadStream(__dirname + '/Home.html', 'utf8');
myReadStream.pipe(res);
});

server.listen(3000);
console.log('travelling to port 3000');