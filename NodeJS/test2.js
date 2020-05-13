var http = require('http');
var dt = require('./test');
// look for a file inside the folder with the name test
//it will save it in object with the name dt

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	//res.end('Hello World!');
	res.write("The current server time is " + dt.myDateTime());

}).listen(8080);

exports.myDateTime = function(){
	return Date();
}
//exports is a keyword used to make methods available outside the browser