//to include a module, we use the require() function
var http = require('http');
var dt = require('./myfirstmodule');
// the ./ is used to locate the module which means they are in the same folder

//since applications need to access the HTTP module we use the following function
//createServer() method creates an HTTP server to listen to server ports and gives a response to the client
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  //this writes an HTTP header this means the header is displayed as HTML
  //200 is a status code which means all is OK
  //second parameter means object containing the response headers 
  res.write("The current server time is " + dt.myDateTime());
  res.write(req.url);
  //this means that you want to write and display the source or the requesting URL
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month
  res.end(txt);
  //this way we can split the query into parts of many strings
  res.end();
}).listen(8080);
//port 8080 is the port that listens and awaits instructions 
//in this code the function receives two parameters, req, res. 
//req is the request from client, it is an incoming message object


//if we want to return the current date and time here is a sample function
exports.myDateTime = function(){
 return Date();
};
//the exports keyword is used to make properties and methods available outside the module file