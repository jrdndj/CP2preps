var http = require('http');
var url = require('url');
var fs = require('fs');

// this method basically requires an URL
// if the URL (uniform resource locator) is empty, it will say undefined

http.createServer( function(req, res){
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	// filename = pageOne.html
	fs.readFile(filename, function(err, data){
		if(err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end('404 Not Found! Blah Blah');
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(8080);
