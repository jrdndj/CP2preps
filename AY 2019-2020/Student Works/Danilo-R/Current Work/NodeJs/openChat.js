var http = require('http');
var url = require('url');

/* I have this function and node.js will call this function 
if I want to write or add content in my html page */
function formatAsHtml(content) {
	var output = 
	"<!DOCTYPE html>\n" + 
	"<html>\n" +
	"<head>\n" +
    "<meta charset=\"UTF-8\">\n" +
    "<title>My Chit Chat</title>\n" +
    "</head>\n" +
    "<body>\n" +
    content + "\n" +
    "</body>\n" +
    "</html>";
    return output;
} // end function 'formatAsHtml'
/* function formatAsHtml receives content as a parameter and
this function aadds content into HTML code */


// we will be using an array of messages for the chat
var messages = [];


/* this function will receive the requests from the client 
and will display the response from the server */
function handleRequest(request, response) {
	var urlData = url.parse(request.url, true);
	var parameters = urlData.query;

	// begin 'if chat.html'
	if (urlData.pathname = "/chat.html") {
		response.writeHead(200, {'Content-Type': 'text/html'});

		// begin 'if check nickname'
		if (parameters.nick == undefined || parameters.nick == "") {
			console.log("User has no nickname. Getting nickname now from the user ...");
			var page = 
			"<form>\n" +
			"<div>Nickname:</div>" + 
			"<div><input type=\"text\" name=\"nick\" autofocus>&nbsp;<button>Chat!</button></div>\n" +
			"</form>";
			// HTML code in page is sent and added as content to formatAsHtml
			response.end(formatAsHtml(page));
		} // end 'if check nickname'
		// begin 'else check nickname'
		else {
			console.log("User is already registered. Message sending can now begin");
			// begin 'if check message empty'
			if (parameters.msg !== undefined && parameters.msg !== "")
				messages.push(parameters.nick + ": " + parameters.msg);

			var page = "";
			// we need to display the latest message sent in the array to the page
			// check if length is by 20 messages
			for (var i = messages.length; i < 20; i++) 
				// this code creates the next space between messages
				page += "<div>&nbsp</div>\n";
			var startIndex = 0;
			if (messages.length > 20) 
				startIndex = messages.length - 20;

			for (var i = startIndex; i < messages.length; i++)
			// iterate through the array to show messages sent 
				page += "<div>" + messages[i] + "</div>\n";
				// keep asking the user for more messages
			page += 
			"<form>\n" +
	          		"<input type=\"hidden\" name=\"nick\" value=\"" + parameters.nick + "\">\n" +
	          		"<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +
	          		"<button>Send</button></div>\n" +
	          		"</form>\n" +
	          		"<div><a href=\"/chat.html\">Log out</a></div>";
	          	// send page to format so it will be displayed
	        response.end(formatAsHtml(page));
	        console.log("message sent by " + parameters.nick);
		} // end 'else check nickname'

	} // end 'if chat.html'
	// begin 'else chat.html'
	else {
		response.writeHead(400, {'Content-Type': 'text/html'});
		response.write(formatAsHtml("<div>Page not here bruh </div>"));
		response.end();
	} // end 'else chat.html'

} // end function 'handleRequest'

// server calls function 'handleRequest' 
// to make it look elegant, we define handleRequest outside, before createServer
var server = http.createServer(handleRequest);
server.listen(8080);
console.log("Ahoy! Server is up at port 8080. Beep beep!");






