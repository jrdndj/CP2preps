var http = require('http');
var url = require('url');

//I have this function and node js will called this function
//If you eant to write or add content in my html page

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
//function formatAsHtml recieves content as a parametar and this function adds content into html code

//we willbe using an array of messages for the chat 
var message = [];

//this fun. will recieve the request from the client and will display the response from the server
function handleRequest(request, response){
	var urlData = url.parse(request.url, true);
	var parameters = urlData.query;

}//end func. handlerequest

//server calls function handleRequest, to make it look elegant we define handleRequest outside, before createServer
var server = http.createServer(handleRequest);
server.listen(8080);
//this is a message we show in the console/terminal

console.log("Ahoy! Server is at port 8080 uo beep beep!")