var http = require('http').createServer(response);
var url = require('url');
var fs = require('fs');
var io = require('socket.io') (http);


// handling the request for the server
function response(req, res) {
    var q = url.parse(req.url, true);
    
    var fn = "." + q.pathname;
    fs.readFile(fn, function(err,data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("Error 404. Page not found.");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
};

// connecting with server
http.listen(8080);
console.log("Server running...");


// displaying the messages
io.on("connection", function(socket){
    socket.on("send message", function(sent_msg, callback){
		sent_msg = sent_msg;

		io.sockets.emit("update messages", sent_msg);
		callback();
    });
});  