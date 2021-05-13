var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer( function(req, res){
	var q = url.parse(req.url, true);
	//http://localhost:8080/page1.html
	var filename = "." + q.pathname;
	//filename = page1.html
	fs.readFile(filename, function(err, data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			fs.readFile('cry.html', function(err, data){
				res.write(data);
				return res.end();
			});
			return res.end();
			//return res.end("404 Not Found! Blah blah");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});	
}).listen(8080);

