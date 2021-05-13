var http = require('http');
var url = require('url');

//this function is what we use to "write on our html page"
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
}

//now we have an array to manage the messages later for the chat
var messages = [];


//this function will receive the requests from the client
//and will also display the response from the server
function handleRequest(request, response){
	var urlData = url.parse(request.url, true);
	var parameters = urlData.query;

	//check if the url is valid 
	//we activate the server
	//we connect to a page called http://localhost:8080/chat.html
	if(urlData.pathname == "/chat.html"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		//this is us telling the server this is good! ayayay

		//ask for a nickname if there is no nickname, show the HTML form thats gets
		//the nickname
		if(parameters.nick == undefined || parameters.nick == ""){
			var page = 
			"<form>\n" +
			"<div>Nickname:</div>" + 
			"<div><input type=\"text\" name=\"nick\" autofocus>&nbsp;<button>Chat!</button></div>\n" +
			"</form>";
			response.end(formatAsHtml(page));
		}//end if nickname check
		//if there is already a nickname then proceed to else below
		else{
			//if there is already a nickname then proceed with chat but we need to check
			//if there is a message, add it to the array 
			if(parameters.msg !== undefined && parameters.msg !== "")
				messages.push(parameters.nick + ": " + parameters.msg);
			    // Jordan: hello? 
			    //Jordan is nick hello? is the msg

			    //we need to display the contents of the array 
			    var page = "";
			    //we use a for loop to display the contents of the array of messages 
			    for(var i = messages.length; i< 20; i++)
			    	//this creates the new line when a message pops up
			    	page += "<div>&nbsp;</div>\n";
			    var startIndex = 0;
			    if(messages.length > 20)
			    	startIndex = messages.length - 20;
			    //iterate through the messages inside the array 
			    for(var i = startIndex; i < messages.length; i++)
			    	page += "<div>" + messages[i] + "</div>\n";
			    page +=
				    "<form>\n" +
	          		"<input type=\"hidden\" name=\"nick\" value=\"" + parameters.nick + "\">\n" +
	          		"<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +
	          		"<button>Send</button></div>\n" +
	          		"</form>\n" +
	          		"<div><a href=\"/chat.html\">Log out</a></div>";
          		response.end(formatAsHtml(page));
		}//end else nickname check nickname is already there 
	}//end if urldatapathname
	else{
		response.writeHead(404,{'Content-Type': 'text/html'});
		response.write(formatAsHtml("<div>Page not found awee! </div>"));
		response.end();
	}//end else
}//end function handleRequest

//function definition is NOW outside the createServer just to make the code look elegant
var server = http.createServer(handleRequest);
server.listen(8080);
//this is a message seen in the console to say that server is up
console.log("Server is up at port 8080.");




















