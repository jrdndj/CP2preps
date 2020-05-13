exports.myDateTime = function(){
	return Date();
};
//Date() is a JS browser function that tells us 
//the current date and time and timezone
//nodejs is outside the browser
//exports keyword allow us to "call" a browser function
// like Date() and use it for the server
//we have a node js function called myDateTime() which
//calls Date() of the browser js 