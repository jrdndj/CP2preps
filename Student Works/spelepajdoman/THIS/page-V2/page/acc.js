var fs = new XMLHttpRequest();
var url = "acc.json";

fs.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var accounts = JSON.parse(this.responseText);
        setTimeout(() => {
            login(accounts);
            register(accounts);
        }, 500); 
    }
};
fs.open("GET", url, true);

var orr = document.getElementById("or");
var user = localStorage.getItem("user");
var acc = document.getElementById("acc");
var loginInfo = document.getElementById("loginInfo");
var loginBtn = document.getElementById("loginBtn");
var loginBtnBf = document.getElementById("loginBtnBf");
var registerBtn = document.getElementById("registerBtn");
var registerBtnBf = document.getElementById("registerBtnBf");

var img1 = localStorage.getItem("img1");
var img2 = localStorage.getItem("img2");
var img3 = localStorage.getItem("img3");
var img4 = localStorage.getItem("img4");

if(acc.innerText == "ACCOUNT"){
    registerBtnBf.style.display = "block";
}else registerBtnBf.style.display = "none";

function getInputs(){
    fs.send();
}
function loginInit(){
    loginInfo.innerText = "Login";
    loginInfo.style.textTransform = "uppercase";
    loginInfo.style.fontWeight = "600";
    loginInfo.style.color = "white";

    loginBtnBf.style.display = "none";
    loginBtn.style.display = "block";
    registerBtn.style.display = "none";
    registerBtnBf.style.display = "block";
    orr.style.display = "block";
    loginInfo.innerText = "LOGIN";
    
    document.getElementById("newUser").style.display = "none"; 
    document.getElementById("newPass").style.display = "none";

    document.getElementById("username").style.display = "block";
    document.getElementById("password").style.display = "block";

}
function registerInit(){
    loginInfo.innerText = "Register";
    loginInfo.style.textTransform = "uppercase";
    loginInfo.style.fontWeight = "600";
    loginInfo.style.color = "white";

    loginBtnBf.style.display = "block";
    loginBtn.style.display = "none"
    registerBtnBf.style.display = "none";
    registerBtn.style.display = "block";
    orr.style.display = "none";

    document.getElementById("newUser").style.display = "block"; 
    document.getElementById("newPass").style.display = "block";

    document.getElementById("username").style.display = "none";
    document.getElementById("password").style.display = "none";
}

var images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4
}

var colors = {
    1: "rgba(52, 152, 219, 0.6)",
    2: "rgba(0, 155, 0, 0.6)",
    3: "rgba(128, 0, 128, 0.6)",
    4: "rgba(128, 128, 128, 0.6)"
}

for(let i in images){
    if(images[i] !== null || acc.innerText !== "ACCOUNT"){
        $('body').css('background-image', 'url("images/' +i+ '.jpg")');
        $('.pajs').css('background', colors[i]);
        break;
    }
}

if(user == "" || user == null){
    $('body').css('background-image', 'url("images/1.jpg")')
    $('.pajs').css('background', 'rgba(52, 152, 219, 0.6)');
    acc.innerText = "ACCOUNT";
    loginInfo.innerText = "LOGIN";
    var storePage = document.getElementById('storePage');
    storePage.remove();
}else{
    acc.innerText = user;
    loginInfo.innerText = "Logged in as " +user;
    document.getElementById("newUser").style.display = "none"; 
    document.getElementById("newPass").style.display = "none";
    document.getElementById("username").style.display = "none";
    document.getElementById("password").style.display = "none";
    registerBtn.style.display = "none";
    registerBtnBf.style.display = "none";
    loginBtn.innerText = "Log out";
    orr.style.display = "none";
    loginBtn.onclick = () => { logOut() };
}

function login(accounts){ 
    var username = document.getElementById("username").value; 
    var password = document.getElementById("password").value;

    for(let i=accounts.length-1; i>=0; i--){ 
        if(username == "" || password == ""){ break;}
        if(i == 0 && username !== accounts[i].username && password !== accounts[i].password){ 
            loginInfo.style.textTransform = "lowercase";
            loginInfo.style.fontWeight = "100";
            loginInfo.style.color = "red";
            loginInfo.innerText = "Incorrect username or password";
            registerBtnBf.style.display = "block";
            password.style.color = "red";
            username.style.color = "red";
            break;
        }
        if(username == accounts[i].username && password == accounts[i].password){ 
            localStorage.removeItem("user");
            localStorage.setItem("user", accounts[i].username);
            window.location.href = 'index.html';
            return;
        }continue; 
    }
}

function register(accounts){ 
    var regUser = document.getElementById("newUser").value; 
    var regPass = document.getElementById("newPass").value;

    registerBtnBf.style.display = "none";

    var newUser = { 
        username: regUser,
        password: regPass,
        score: "",
        best: 0
    }
   var configNewUser = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }

    if(regUser == "" || regPass == ""){ 
        return;
    }else{
    for(let i=0; i<accounts.length; i++){ 
        if(regUser == accounts[i].username){
            alert("Username already taken, please enter another username");
            window.top.location = window.top.location;
            return;
        }else if(regPass.length<8){ 
            alert("Too short password. Password must have at least 8 characters");
            window.top.location = window.top.location;
            return; 
        }
    }
    fetch('/api', configNewUser);
    localStorage.setItem("user", regUser);
    window.location.href = 'index.html';
    }   
}

function logOut(){
    localStorage.removeItem("user");
    location.reload();
}