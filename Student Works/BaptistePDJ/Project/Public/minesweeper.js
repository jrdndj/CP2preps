
var time//the time of play
var test;//It's a test to say if the game has started (1) or not (0)
var tiles;//The number of tiles without mines
var username;
/*function that reset the timer to 0*/

//reset the time
function reset() {
    var timer = document.getElementById('timer');
    timer.innerHTML = "0";
  }
  //function that increase the timer
function increaseTimer() {
	var timer = document.getElementById('timer');
    var n = parseInt(timer.innerHTML);
    n++;
    timer.innerHTML = n.toString();
    time = n.toString();
  }
//start a new game with this function
function newGame(w, h, m) {
	w = Number(w);
    h = Number(h);
    m = Number(m);
    tiles = w * h - m;
    console.log(tiles);

	test = 0;
	minefield = new Minefield(w, h, m);
	reset();
	window.clearInterval(timer);//stop the timer increasement
	console.log("minefied cree");
	print();
}

function check() {
	var x = document.getElementById("x").value;
	var y = document.getElementById("y").value;
	alert(minefield.symbol(x, y));
}

// show the number or the mine in the case
function hit(x, y) {
	var name = document.getElementById("username").value;
	while(name== null || name == "")//Look if the player has an username
	{
		name = prompt("Please enter your Username", "Guest");
		document.getElementById("username").value = name;
	}
	username = name;
	if(test == 1){//A hit when the game has started
		minefield.unveil(x, y);
		print();
	}
	else{//The very first hit start the time
		timer = window.setInterval(increaseTimer, 1000);
		minefield.unveil(x, y);
		print();
		test = 1;
	}
	
}

function victoryOrLose(){//Verify if the player has won or lost
	if(minefield.explosions != 0){//Lost
		alert("You lose try again");
		window.clearInterval(timer);
	}
	console.log(minefield.explosions);
	console.log(minefield.veiled);
	console.log(minefield.mines);
	if(minefield.veiled == minefield.mines && minefield.explosions == 0){//Won
		alert("You win Congratulations !!!");
		console.log(time);
		console.log(username);
		var timerS = time.toString();
		var usernameS = username.toString();
		//Say to the player if he want to see him in the top player rank
		var toplink = '<a class="nav-link a1" href="Top.html/' + usernameS + '/' + timerS + '/">TOP PLAYERS</a>';
		var link = "<a href='Top.html/" + usernameS + "/" + timerS + "/'><button>See your rank ?</button></a>";
		document.getElementById('toplink').innerHTML = toplink;
		document.getElementById('mainfield').innerHTML = link;
		window.clearInterval(timer);

	}
}
//print the field
function print() {
	console.log("print activé");
	document.getElementById("mainfield").innerHTML = minefield.tString();
	victoryOrLose();
	console.log("print fini");
	}
