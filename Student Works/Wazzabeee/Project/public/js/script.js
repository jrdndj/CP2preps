var origBoard, huPlayer, aiPlayer, aiLevel;

const winningCombos = [ //stores winning cells combinations
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];


const cells = document.querySelectorAll('[data-cell]'); //retrieve all the cell objects of our board from the html page

function gameStart(shape, type) {
	document.getElementById("endgamePopop").style.display = "none";
	origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //initialize the cells in an array
	aiLevel = type;
	
	//set users's shapes
	huPlayer = shape;
	aiPlayer = (huPlayer == "X" ? "O" : "X");

	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', cellClicked, false); //on event click on cell, call the cellClicked function
	}
	if(aiLevel == "strongIA") document.getElementById("return").disabled = true;
	else { document.getElementById("return").disabled = false; }
	document.getElementById("reset").disabled = false;
}

function softReset() { //onClick on reset button : clearboard but does not restart the game
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
	}
	origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

function cellClicked(cell) {
	var transition = cell.target.id;
	var data = {transition, origBoard};
	
	const options = {
		method: 'POST',
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	};

	fetch('/cellClicked', options).then(res => {

        if(res.status == 200){ //if cell is empty
			turn(cell.target.id, huPlayer); //fill cell clicked with human's shape

			checkWin().then(isGameWon => {
				if(!checkTie() && isGameWon == null) { //if no tie and no one has won yet
					if(aiLevel == "strongIA") { 
						bestSpot("minimax",origBoard).then(res => {
							turn(res,aiPlayer);
						});
					} else {
						bestSpot().then(res => {
							turn (res,aiPlayer);
						})
					}
				}
			})
		} else { //a player has already played on this cell
			console.log("Human player can not play here");
		}
	});
}

function turn(cellId, player) {
	origBoard[cellId] = player; //updates origBoard
	document.getElementById(cellId).innerText = player; //modify the innerText of the HTML object with the user's shape
	
	checkWin(origBoard, player).then(isGameWon =>{ //before AI plays we check if Human player has won already
		if(isGameWon) gameOver(isGameWon)
	});
}

async function checkWin(board, player) {

	var huPlays = [];//stores cells where HU player played
	var aiPlays = [];//stores cells where AI player played

	for (var j = 0; j < cells.length; j++) {

		if(cells[j].innerText == huPlayer) {
			huPlays.push(parseInt(cells[j].id));
		}
		else if (cells[j].innerText == aiPlayer) {

			aiPlays.push(parseInt(cells[j].id));
		}
	}

	var human = {huPlayer, huPlays};
	var ai = {aiPlayer, aiPlays};

	var data = {board : origBoard, combos : winningCombos, hu : human, arti : ai};
	
	const options = {
		method: 'POST',
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	};

	const res = await fetch('/winCheck', options);
	const serverRes = await res.json();

	if(serverRes.status == 'success') {
		return serverRes.details; //returns the combo + player who won
	} else {
		return null;
	}
}

function gameOver(gameWon) {
	for(let index of winningCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "green" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', cellClicked, false);	
	}
	document.getElementById("return").disabled = true;
	document.getElementById("reset").disabled = true;
	displayWinner(gameWon.player);
}

function displayWinner(who) {
	document.getElementById("endgamePopop").style.display = "block";

	if(who == huPlayer){
		document.getElementById("validationDefaultUsername").disabled = false;
		document.getElementById("CustomEndText").innerHTML = "Congratulations ! You won against an AI. What an achievement... (: \n If you want to save your win in the leaderboard type your username below."
	} else if (who == aiPlayer) {
		document.getElementById("validationDefaultUsername").disabled = true;
		document.getElementById("CustomEndText").innerText = "You just lost against our AI... I suggest you train more next time... \n If you win next time, you'll be able to add it to the leaderboard."
	} else {
		document.getElementById("validationDefaultUsername").disabled = true;
		document.getElementById("CustomEndText").innerText = "Argh... So close to win this... You'll do better next time. \n If you win next time, you'll be able to add it to the leaderboard."
	}
}

async function bestSpot(from, board) {
	if(from == "minimax"){
		var bestCell = await minimax(origBoard, aiPlayer);
		if(bestCell != undefined) return bestCell.index;
	}
	else {

		var data = {origBoard, from};
		const options = {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify(data)
		};

		const res = await fetch('/aiBestSpot', options);
		const serverRes = await res.json();

		if(serverRes.status == 'success') {
			return serverRes.spots[0]; //returns the first available spot in the array 
		} else {
			return null;
		}
	}
	//the response is coming as a datastream
	//we want to read it as JSON
	//we can handle it with another .then or with an async function
}

function checkTie() {
	bestSpot("checkTie").then(res => {
		checkWin().then(ans => {
			if(res == null && ans == null){ //bestSpot = null => no cells available 
				for (var i = 0; i < cells.length; i++) {
					cells[i].removeEventListener('click', cellClicked, false);
					cells[i].style.backgroundColor = "pink";	
					}
					displayWinner();
					return true;
			} else {
				return false;
			}
		}); //we wait for the async bestSpot function to finish before continuing
	});
}

function goBack() {
	getBoardHistory().then( boardHistory => {
		if(boardHistory.length > 0) {
			softReset();
			origBoard = boardHistory[boardHistory.length - 2];
			for (var i = 0; i < cells.length; i++) {
				if(isNaN(origBoard[i])){
					cells[i].innerText = origBoard[i];
				}
			}
		} else {
			console.log("Could not go back to previous state of the board");
		}
	});
}

async function getBoardHistory() {
	const options = {
		method: "GET",
	};
	const res = await fetch('/boardHistory', options);
	const serverRes = await res.json();

	if(serverRes.status == "success") return serverRes.historical;
}

//Minimax algorithm applied to Tic Tac Toe 
//Source : https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/

async function minimax(newBoard, player) {
	const data = {newBoard, player, winningCombos, huPlayer, aiPlayer}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	};

	const res = await fetch('/startMinimax', options);
	const serverRes = await res.json();

	if(serverRes.status == "success") return serverRes.data;
}