var http = require('http');
var url = require('url');

function formatAsHtml(content) {
  var output =
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<meta charset=\"UTF-8\">\n" +
    "<title>RP2 Chat</title>\n" +
    "</head>\n" +
    "<body>\n" +
    content + "\n" +
    "</body>\n" +
    "</html>";
  return output;
}

var messages = [];

function handleRequest(request, response) {
  var urlData = url.parse(request.url, true);
  var parameters = urlData.query;

  if (urlData.pathname == "/chat.html") {
    response.writeHead(200, {'Content-Type': 'text/html'});

    if (parameters.nick === undefined || parameters.nick == "") {
      var page =
        "<form>\n" +
        "<div>Nickname:</div>" +
        "<div><input type=\"text\" name=\"nick\" autofocus>&nbsp;<button>Chat!</button></div>\n" +
        "</form>";
      response.end(formatAsHtml(page));
    }
    else {
      if (parameters.msg !== undefined && parameters.msg != "")
        messages.push(parameters.nick + ": " + parameters.msg);

        var page = "";
        for (var i = messages.length; i < 20; i++)
          page += "<div>&nbsp;</div>\n";
        var startIndex = 0;
        if (messages.length > 20)
          startIndex = messages.length - 20;
        for (var i = startIndex; i < messages.length; i++)
          page += "<div>" + messages[i] + "</div>\n";
        page +=
          "<form>\n" +
          "<input type=\"hidden\" name=\"nick\" value=\"" + parameters.nick + "\">\n" +
          "<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +
          "<button>Send</button></div>\n" +
          "</form>\n" +
          "<div><a href=\"/chat.html\">Log out</a></div>";
        response.end(formatAsHtml(page));
    }
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(formatAsHtml("<div>Page not found!</div>"));
    response.end();
  }
}

var server = http.createServer(handleRequest);
server.listen(8080);
console.log("Listening at port 8080.");