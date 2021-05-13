// getting the username
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(10);
var queries = queryString.split("&");
var name = queries[0]; 
localStorage.uname = name;


// using the username in the welcome text
var welcomeText = document.getElementById("welcome");
welcomeText.innerHTML = "Hello " + name + "! Welcome to Live Chat";


// using the username in the chat header, above online status
var username = document.getElementById("username");
username.innerHTML = name; 

// when "Leave page" clicked
function clearMessages() {
    alert("You will be starting all over again!");
};