var http = require('http');
var url = require('url');
var fs = require('fs');
//http://localhost:8080/page1.html

http.createServer(function(req, res){
	var q = url.parse(req.url, true);
	//is there a url? page1.html
	var fn = "." + q.pathname;
	//fn = page1.html
	fs.readFile(fn, function(err,data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("Blah page is not here 404 shoo");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(8080);



