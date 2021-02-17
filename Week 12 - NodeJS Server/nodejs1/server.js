var http = require('http');
var url = require('url');

function formatAsHtml(content) {
  var htmlCode =
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<meta charset=\"UTF-8\">\n" +
    "<title>RP2 Server</title>\n" +
    "</head>\n" +
    "<body>\n" +
    content + "\n" +
    "</body>\n" +
    "</html>";
  return htmlCode;
}

var messages = [];

function handleRequest(request, response) {
  console.log("Someone connected to me.");
  console.log(request.url);

  var urlData = url.parse(request.url, true);
  var parameters = urlData.query;

  if (urlData.pathname == "/chat.html") {
    if (parameters.msg !== undefined && parameters.msg != "")
      messages.push(parameters.msg);

    response.writeHead(200, {'Content-Type': 'text/html'});

    var page = "";
    for (var message of messages) {
      page += "<div>" + message + "</div>\n";
    }

    page +=
      "<form>\n" +
      "<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +
      "<button>Send</button></div>\n" +
      "</form>";

    response.write(formatAsHtml(page));
    response.end();
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(formatAsHtml("Page not found!"));
    response.end();
  }
}

var server = http.createServer(handleRequest);
server.listen(8080);
console.log("I am listening at port 8080!");
