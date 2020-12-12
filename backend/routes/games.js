const router = require('express').Router();
const GamesManager = new (require('../gamesManager.js'))();
let Card = require('../models/card.model');


module.exports = function (io) {

	//create a new game
	// gameInfo should contain the category, number of rounds and number 
	// of max players selected bby user 
	router.route('/').get((req, res) => {
		// let id = GamesManager.createGame(req.username, req.gameInfo);
		// res.json('game id is: ' + id);
		// console.log("CONNECTEDFFFF");
	});

	io.on('connection', function (socket) {
		socket.on("host-game", (message) => {
			console.log(message)
			let id = GamesManager.createGame(message);
			socket.emit('game id', id);
			socket.join(id);
		});

		socket.on("join-game", (message) => {
			if (GamesManager.validGameId(message.gameId)) {
				if (GamesManager.joinGame(message.username, message.gameId)) {
					let players = GamesManager.findGame(message.gameId).players;
					socket.join(message.gameId);
				} else {
					socket.emit('join-error', 'connection rejected: maximum players reached');
				}
			}
		});

		socket.on("wait-queue", (message) => {
			let players = GamesManager.findGame(message.gameId).players;
			io.sockets.emit('user-joined', players);
		});

		socket.on('start-game', async (gameId) => {
			if (GamesManager.validGameId(gameId)) {
				GamesManager.startGame(gameId);
				io.sockets.emit('game-started', "game start");
				io.sockets.emit('game-state', await GamesManager.getGameState(gameId));

			} else {
				console.log("invalid id")
			}
		});

		socket.on('refresh', (gameId) => {
			io.sockets.emit('game-state', GamesManager.getGameState(gameId));
		});

		// info would include the card and username
		socket.on('submit-card', (gameId, data) => {
			if (GamesManager.validGameId(gameId)) {
				if (GamesManager.validUser(data.username)) {
					console.log("submitting ", data)
					GamesManager.submitWhiteCard(gameId, data.username, data.card);
					// ********** remove following line later *****************
					io.sockets.emit('game-state', GamesManager.getGameState(gameId));
					socket.to(gameId).emit('game-state', GamesManager.getGameState(gameId));
				}
			}
		});

		socket.on('round-winner', (gameId, data) => {
			if (GamesManager.validGameId(gameId)) {
				GamesManager.selectWinner(data.username, data.gameId);
				// send updated score board
				// ********** remove following line later *****************
				socket.emit('update-scoreboard', GamesManager.getScoreBoard(gameId));
				socket.to(gameId).emit('update-scoreboard', GamesManager.getScoreBoard(gameId));
				if (GamesManager.isGameOver(gameId)) {
					// ********** remove following line later *****************
					socket.emit('game-over', GamesManager.getGameState(gameId));
					socket.to(gameId).emit('game-over', GamesManager.getGameState(gameId));
				} else {
					GamesManager.startNextRound(gameId);
					// ********** remove following line later *****************
					socket.emit('game-state', GamesManager.getGameState(gameId));
					socket.to(gameId).emit('game-state', GamesManager.getGameState(gameId));
				}
			}
		});


		// Chat portion
		// Data => { gameId, username, message }
		socket.on('message', (gameId, data) => {
			socket.emit('message-broadcast', GamesManager.getGameState(gameId));
			socket.to(gameId).emit('message-broadcast', data);
		});
	});

	return router;

}