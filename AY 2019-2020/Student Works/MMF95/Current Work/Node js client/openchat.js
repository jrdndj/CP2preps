var http = require( 'http');
var url = require('url');


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



var messages = [];





function handleRequest(request, response){

var urlData= url.parse(request.url,true);
var parameters = urlData.query;

if(urlData.pathname =="/chat.html"){
response.writeHead(200, {'Content-Type': 'text/html'});
console.log("User is in the chat");

if(parameters.nick == undefined || parameters.nik ==""){

console.log("User has no nickname. Getting nickname now from the user..")
var page =

"<form>\n" +		
"<div>Nickname:</div>" + 			
"<div><input type=\"text\" name=\"nick\" autofocus>&nbsp;<button>Chat!</button></div>\n" +			
"</form>";

response.end(formatAsHtml(page));
console.log("nickname has been saved in the server");


}
else{

console.log("User is already registered. Message sending can now begin");

if(parameters.msg !== undefined && parameters.msg !== "")


msessge.push(parameters.nick + ":" + parameters.msg);

var page ="";

for(var i = messages.length;i < 20; i++)
page += "<div>&nbsp<div>\n";
var startIndex= 0;
if(messages.length > 20)
startIndex = messages.length - 20;



for(var i =startIndex; i<message.length; i++)

page += "<div>" + message[i]+ "</div>\n";

page +=

"<form>\n" +	          		
"<input type=\"hidden\" name=\"nick\" value=\"" + parameters.nick + "\">\n" +	          		
"<div>Message:&nbsp;<input type=\"text\" name=\"msg\" autofocus>&nbsp;" +	          		
"<button>Send</button></div>\n" +	          		
"</form>\n" +	          		
"<div><a href=\"/chat.html\">Log out</a></div>";

response.end(formatAsHtml(page));
console.log("messgae sent by " + parameters.nick);




}




}

else {
response.writeHead(404, {'Content-Type': 'text/html'});
console.log("page not found is server")
rsponse.write(formatAsHtml("<div>Page not here bruh </div>""));
response.end();

}

}



var server = http.createServer(handleRequest);
server.listen(8080);
console.log("Ahoy! server is at port 8080 up beep!");
