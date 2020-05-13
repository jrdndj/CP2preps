var http = require('http');
//this code requires http 
var fs = require('fs');
//you need to use file systems in your server
var url = require('url');
//we need this for a specific url
//localhost:8080/page1

http.createServer(function(req, res){
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	fs.readFile(filename, function(err, data){
		if(err){
		   res.writeHead(404, {'Content-Type': 'text/html'});
		   return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(8080);

//what this code does is it finds a the file page1.html and gets its "data" 
//displays it in a browser

//there is a way for us to use the server we are calling the file instead of 
//printing the file 

