var http = require('http');
var url = require('url');

//I have this function and node js will called this function
//if I want to write or add content in my html page
function formatAsHtml(content){
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
}//end function formatAsHtml
//function formatAsHtml receives content as a parameter
//and this function adds content into html code

//we will be using an array of messages for the chat
var messages = [];


//this function will receive the requests from the client
//and will display the response from the server
function handleRequest(request, response){
	//DO SOMETHING
	//var urlData = url.parse(request.url, true).query;
	var urlData = url.parse(request.url, true);
	var parameters = urlData.query;
	//localhost:8080/jordan.html?year=2020&month=05
	//urlData = /jordan.html?name=jordan&age=21
	//parameters = urlData.query = jordan is name, 21 is age

	//begin if chat.html
	if(urlData.pathname == "/chat.html"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		//this is us telling the server we are ayayay good!
		//DO SOMETHING 
		console.log("User is in the chat");

		//by default you must ask for a nickname
		//begin if check nickname
		if(parameters.nick == undefined || parameters.nick == ""){
			//get nickname from user submit nickname to server
			console.log("User has no nickname. Getting nickname now from the user..");
			//this basically sends an html to be displayed into the page
			var page = 
			"<form>\n" +
			"<div>Nickname:</div>" + 
			"<div><input type=\"text\" name=\"nick\" autofocus>&nbsp;<button>Login!</button></div>\n" +
			"</form>";
			//html code in page is sent and added as content to formatAsHtml
			response.end(formatAsHtml(page));
		}//end if check nickname
		//begin else check nickname - basically if user has nickname go to this else
		else {
			console.log("User is already registered. Message sending can now begin");
			//check if there is a message add it to the array 
			//begin if check message not empty
			if(parameters.msg !== undefined && parameters.msg !== "")
				//add this message to the array
				messages.push(parameters.nick + ": " + parameters.msg);
				//Jordan: hello? is added to the array

				var page = "";
				//we need to display the latest message sent in the array to the page
				//i added these three lines of code
				//check if length is by 20 messages
				for(var i = messages.length; i < 20; i++)
					//this code creates the next space between messages 
					page += "<div>&nbsp</div>\n";
				var startIndex = 0;
				if(messages.length > 20)
					startIndex = messages.length - 20;
				for(var i = startIndex; i < messages.length; i++)
					//iterate thru the array to show messages sent
					page += "<div>" + messages[i] + "</div>\n";
				//keep asking the user for more messages
				page += 
					"<form>\n" +
	          		"<input type=\"hidden\" name=\"nick\" value=\"" + parameters.nick + "\">\n" +
	          		"<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +
	          		"<button>Send</button></div>\n" +
	          		"</form>\n" +
	          		"<div><a href=\"/chat.html\">Log out</a></div>";
	          	//send page to format so it will be displayed
	          	response.end(formatAsHtml(page));
	          	console.log("message sent by " + parameters.nick);
		}//end else check nickname
	}//end if chat.html
	//begin else chat.html
	else {
		response.writeHead(404, {'Content-Type': 'text/html'});
		console.log("page not found in server");
		response.write(formatAsHtml("<div>Page not here bruh </div>"));
		response.end();
	}//end else chat.html
}//end function handleRequest

//server calls function handleRequest
//to make it look elegant we define handleRequest outside, before createServer
var server = http.createServer(handleRequest);
server.listen(8080);
//this is a message we show in the console/terminal 
console.log("Ahoy! Server is up at port 8080  beep beep!");












