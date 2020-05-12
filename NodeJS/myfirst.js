//to include a module, we use the require() function
var http = require('http');

//since applications need to access the HTTP module we use the following function
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
//port 8080 is the port that listens and awaits instructions 

//if we want to return the current date and time here is a sample function
exports.myDateTime = function(){
 return Date();
};
//the exports keyword is used to make properties and methods available outside the module file