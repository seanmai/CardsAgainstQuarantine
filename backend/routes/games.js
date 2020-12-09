const router = require('express').Router();
const GamesManager = new (require('../gamesManager.js'))();
let Card = require('../models/card.model');


module.exports = function(io) {

	//create a new game
	// gameInfo should contain the category, number of rounds and number 
	// of max players selected bby user 
	router.route('/').get((req, res) => {
		// let id = GamesManager.createGame(req.username, req.gameInfo);
		// res.json('game id is: ' + id);
		// console.log("CONNECTEDFFFF");
	});

	io.on('connection', function(socket) {

			socket.on("host-game", (username, gameInfo) => {
				let id = GamesManager.createGame(username, gameInfo);
				socket.emit('game is is:' + id);
				socket.join(id);
			});

			socket.on("join-game", (gameId, username) => {
				if(GamesManager.validGameId(gameId)){
					if(GamesManager.joinGame(username, gameId)){
						socket.join(gameId);
						socket.to(gameId).emit('user-joined', username + ' joined the game');
					} else{
						socket.emit('server message', 'connection rejected: maximum players reached');
					}
				} 
			});

			socket.on('start-game', (gameId, username) => {
				if(GamesManager.validGameId(gameId)){
					GamesManager.startGame(gameId);
					socket.to(gameId).emit('game-state', GamesManager.getGameState(gameId));
				}
			});

			// info would include the card and username
			socket.on('submit-card', (gameId, data) => {
				if(GamesManager.validGameId(gameId)){
					if(GamesManager.validUser(data.username)){
						GamesManager.submitWhiteCard(data.username, data.card);
						socket.to(gameId).emit('card-submitted', GamesManager.getBoardCards(gameId));
					}
				}
			});

			socket.on('round-winner', (gameId, data) => {
				if(GamesManager.validGameId(gameId)){
					GamesManager.selectWinner(data.username, data.gameId);
					// send updated score board
					socket.to(gameId).emit('update-scoreboard', GamesManager.getScoreBoard(gameId));
					if(GamesManager.isGameOver(gameId)){
						socket.to(gameId).emit('game-over', GamesManager.getGameState(gameId));
					} else{
						GamesManager.startNextRound(gameId);
						socket.to(gameId).emit('game-state', GamesManager.getGameState(gameId));
					}
				}
			});
		
		});

	return router;

}