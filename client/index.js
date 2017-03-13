var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/************ build the game *************/

var Game = function() {
	this.board = [];
	this.init();
	this.moveCount = 0;
	this.winPlayer = '';
}
Game.prototype.init = function() {
	this.board = [];
	for (var i = 0; i < 3; i++) {
		this.board[i] = ['-','-','-'];
	}
	this.render();
}
Game.prototype.render = function() {
	for (var i = 0; i < 3; i++) {
		console.log(this.board[i][0], this.board[i][1], this.board[i][2]);
	}
}
Game.prototype.move = function(row, col) {
	if (this.moveCount % 2 === 0) {
		this.currentPlayer = 'X';
	} else {
		this.currentPlayer = 'O';
	}
	if (this.board[row][col] === '-') {
		this.board[row][col] = this.currentPlayer;
	console.log('inside move', this.currentPlayer);
		this.moveCount++;
		this.checkWin();
		this.render();
	} else {
		console.log('Invalid move');
	}
}
Game.prototype.checkWin = function() {
	if(this.checkRow() || this.checkCol() || this.checkDiag()) {
		console.log('Game over!', this.winPlayer + ' wins!');
		return true;
	}
	return false;
}
Game.prototype.checkRow = function() {
	for (var i = 0; i < 3; i++) {
		if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== '-') {
			this.winPlayer = this.board[i][0];
			return true;
		}
	}
	return false;
}
Game.prototype.checkCol = function() {
	for (var i = 0; i < 3; i++) {
		if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== '-') {
			this.winPlayer = this.board[0][i];
			return true;
		}
	}
	return false;
}
Game.prototype.checkDiag = function() {
	var dia1 = this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== '-';
	var dia2 = this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== '-'; 
	if (dia1 || dia2) {
		this.winPlayer = this.board[1][1];
		return true;
	}
	return false;
}


/************ play the game *************/

console.log("Welcome to the game Tic Tac Toe\n by Ai Shi");
var game = new Game();
var waitForInput = function() {
	rl.question('Please enter row number and col number, seperate with a comma: ', function(answer) {
	    var move = answer.split(',');
	    var row = +move[0];
	    var col = +move[1];
	    console.log('your move is ', [row, col]);
	    game.move(row, col);
	    if (game.winPlayer === '') {
	  		waitForInput();	
	    } else {
	    	rl.close();
	    }
	});
}
waitForInput();

