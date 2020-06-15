var mongoose = require('mongoose');
var dbFunctions = require('./DataBase_Controller');
var boardHistory = []; //memorize all states of the board during a game

module.exports = function(app){

    app.get('/boardHistory', function(req,res){ //send to server array : boardHistory
        res.json({
            status: "success",
            historical: boardHistory
        });
        boardHistory.splice(boardHistory.length - 2, 2); //delete the two last moves from historical
    });

    app.post('/start', function(req,res){ //Formality request to be sure the server's ready
        console.log(req.body);
        res.end("success");
    });

    app.post('/cellClicked', function(req,res){ //Players wants to put his shape in a cell
        if(req.body.origBoard[req.body.transition] == req.body.transition){ //check id the id of the cellClicked is still a number in origBoard (ie: if it's still empty)
            
            for(var i = 0; i<9; i++){  //search for the first empty spot in boardHistory[] and paste the actual state of the board
                if(boardHistory[i] == null) { 
                    boardHistory[i] = req.body.origBoard;
                    break;
                }
            }
            res.status(200).send('Human player can play here');
        } else {
            res.status(403).send('Error, human player can not play here'); //403 = Forbidden by server
        }
    });

    app.post('/aiBestSpot', function(req,res){ //send back to client all available cells for weakAI
        //filter all origBoard elem that are still number AKA empty cells
        var emptyCells = req.body.origBoard.filter(elem => typeof elem == 'number' ); 

        if(emptyCells != undefined) {
            for(var i = 0; i<9; i++){
                if(boardHistory[i] == null && req.body.from != "checkTie"){ //we distinguish this function habit when request is from checkTie because no cells are modified
                    boardHistory[i] = req.body.origBoard;
                    break;
                }
            }
            res.json({
                status: 'success',
                spots: emptyCells});
        } else {
            res.json({
                status: 'error'
            });
        }
    });

    app.post('/winCheck', function (req, res){ //check if a player has won the game
 
        let gameWon = null;

        for(let [index, combo] of req.body.combos.entries()) { //for each winning cell combos 
            
            // if each indexOf each elem of a winning combo is different from -1 then his plays match a combo and he won the game
            if(combo.every(elem => req.body.hu.huPlays.indexOf(elem) != -1 )) {              
                gameWon = {index : index, player: req.body.hu.huPlayer};
                console.log("GameWon : " + gameWon.index + " | " + gameWon.player);
                break;

            } else if(combo.every(elem => req.body.arti.aiPlays.indexOf(elem) != -1 )) {
                gameWon = {index : index, player: req.body.arti.aiPlayer};
                console.log("GameWon : " + gameWon.index + " | " + gameWon.player);
                break;
            }
        }	

        if(gameWon != null){
            boardHistory = []; //game's won so we clear boardHistory
            res.json({
                status: 'success',
                details: gameWon
            });
        } else {
            res.json({
                status: 'error'
            });
        }
    });

    app.post('/pushPlayerToDB', function(req,res){ //add Player to DB with DataBase_Controller.js method
        dbFunctions.data.PushPlayerToDB(req.body.username);
    });

    //Minimax algorithm applied to Tic Tac Toe 
    //Source : https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/

    app.post('/startMinimax', function(req,res){
        var result = minimax(req.body, req.body.newBoard, req.body.player);

        if(result != undefined) {
            res.json({
                status: "success",
                data: result
            });
        }
    });
};

function minimax(req, newBoard, player) {
    //filter all newBoard elem that are still number AKA empty cells
    var availableSpots = newBoard.filter(elem => typeof elem == 'number' );

        //check for terminal states
        if(checkWin(newBoard, req.huPlayer, req.winningCombos)) {//human's won
            return {score: -10};
        } else if(checkWin(newBoard, req.aiPlayer, req.winningCombos)) { //AI's won
            return {score: 10};
        } else if(availableSpots.length == 0) { //tie
            return {score: 0};
        }

        var moves = []; //collect the score of each available spots to evaluate them later
		for(var i = 0; i < availableSpots.length; i++) { //we loop through available spots while collecting each move's index and score
			var move = {};
			move.index = newBoard[availableSpots[i]]; //collect move's index
			newBoard[availableSpots[i]] = player; //set the empty spot on the newboard to the current player
    
            //then we call the minimax function with the other player
			if (player == req.aiPlayer) {
				var result = minimax(req, newBoard, req.huPlayer);
				move.score = result.score;
			} else {
				var result = minimax(req, newBoard, req.aiPlayer);
				move.score = result.score;
            }
            //aat the end of the recursion (when it reaches terminal states)

			newBoard[availableSpots[i]] = move.index; //resets newBoard to what it was before
			moves.push(move); //we push the move object to the move array to evaluate it later
		}
	
        var bestMove;
        //we evaluate the best move for the AI in the moves array  i.e : move with highest score for AI / lowest for Human
		if(player == req.aiPlayer) {
			var bestScore = -10000;
			for(var i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) { //keep the highest score | in case different moves have highest score we keep the first one
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			var bestScore = 10000;
			for(var i = 0; i < moves.length; i++) { //keep the lowest one for the Human
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
        }
        return moves[bestMove];
}

function checkWin(board, player, combos) {
    var plays = [];

    for (var j = 0; j < board.length; j++) {
        if(board[j] == player) {
            plays.push(j);
        }
    }

    for(let [index, combo] of combos.entries()) { //for each winning cell combos 
        // if each indexOf each elem of a winning combo is different from -1 then his plays match a combo and he won the game  
        if((plays.indexOf(combo[0]) != -1) && (plays.indexOf(combo[1]) != -1) && (plays.indexOf(combo[2]) != -1)) { 
            return true;
            break;
        }   
    }
    return false;
}