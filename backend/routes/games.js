const router = require('express').Router();
const GamesManager = require('../gamesManager.js');
let Card = require('../models/card.model');


module.exports = function(oi) {

	oi.on('connection', function(socket) {

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
		socket.on('submit-card', (gameId, info) => {
			GamesManager.submitWhiteCard(info.username, info.card);
		});

		socket.on('select-winner', (gameId, info) => {
			GamesManager.
		});

		socket.on('round-winner')
		
	});

	//create a new game
	// gameInfo should contain the category, number of rounds and number 
	// of max players selected bby user 
	router.route('/').post((req, res) => {
		let id = GamesManager.createGame(req.username, req.gameInfo);
		res.json('game id is: ' + id);
	});


	// join a game with provided id 
	// create a game session for user 
	router.route('/:id').post((req, res) => {
		let username = req.body.username;
		let gameId = req.params.id;
		GamesManager.joinGame(username, gameId);
	});

	router.route('/:id/selectWinner').post((req, res) => {

	});

	router.route('/:id/roundWinner').post((req, res) => {

	});

	route.route('/:id/playCard/:cardId').post((req, res) => {
		let username = req.username;
		let gameId = req.params.id;
		let cardId = req.params.cardId;
	});

	return router;

}