var http = require('http');
var url = require('url');
var fs = require('fs');

function handleRequest(request, response) {
  var urlData = url.parse(request.url, true);

  var filename = "." + urlData.pathname;
  console.log("Someone connected to me, and wants: " + filename);

  switch (filename) {
    case "./move.txt":
      response.writeHead(200, {'Content-Type': 'text/plain'});
      var number = Math.floor(Math.random() * 9) + 1;
      response.write("cell" + number.toString());
      response.end();
      break;

    default:
      fs.readFile(filename,
        function(error, data) {
          if (error) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("Error 404: " + urlData.pathname + " not found!");
            response.end();
          }
          else {
            if (/.html$/.test(filename))
              response.writeHead(200, {'Content-Type': 'text/html'});
            else if (/.css$/.test(filename))
              response.writeHead(200, {'Content-Type': 'text/css'});
            else
              response.writeHead(200, {'Content-Type': 'text/plain'});

            response.write(data);
            response.end();
          }
        }
      );
  }
}

var server = http.createServer(handleRequest);
server.listen(8080);
console.log("Tic-Tac-Toe server is running on port 8080!");