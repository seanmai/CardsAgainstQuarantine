var _ = require('underscore');
let Game = require('./game.js');
const shortid = require("custom-id");

//add async and await

let gamesManager = class {

	constructor() {
		this.gamesList = [];
		this.allPlayers = [];
	}

	createGame(message) {
		let gameId = this.generateGameId();
		let game = new Game(message.username, gameId, message.category, message.rounds, message.maxPlayers);
		this.gamesList.push(game);
		game.initCards();
		return gameId;
	}

	findGame(gameId) {
		return _.findWhere(this.gamesList, { id: gameId });
	}

	deleteGame(id) {
		this.gamesList = _.without(this.gamesList, { id: gameId });
	}

	startGame(id) {
		let game = this.findGame(id);
		game.dealHand();
		game.dealBlackCard();
	}

	joinGame(player, gameId) {
		let game = this.findGame(gameId);
		//check if game found 
		if (game.addPlayer(player)) {
			return true;
		}
		return false;
	}

	generateGameId() {
		// check if game with that id already exists 
		// otherwise generate another 
		return shortid({});
	}

	validGameId(id) {
		let game = this.findGame(id);
		if (game === undefined) {
			return false;
		}
		return true;
	}

	getGameState(id) {
		let game = this.findGame(id);
		return game.getState();
	}

	// card would depend on what they send from client side 
	submitWhiteCard(id, username, card) {
		let game = this.findGame(id);
		if (game !== undefined) {
			game.playWhiteCard(username, card);
		}
	}

	validUser(username) {
		for (let i = 0; i < this.gamesList.length; i++) {
			if (this.gamesList[i].validPlayer(username)) {
				return true;
			}
		}
		return false;
	}

	selectWinner(username, gameId) {
		let game = findGame(id);
		if (game !== undefined) {
			game.selectRoundWinner(username);
		}
	}

	startNextRound(gameId) {
		let game = findGame(gameId);
		if (game !== undefined) {
			game.nextRound();
		}
	}

	isGameOver(gameId) {
		let game = findGame(gameId);
		if (game !== undefined) {
			if (!game.gameOver()) {
				return false;
			}
			return true;
		}
	}

	allPlayed(id) {
		let game = findGame(id);
		if (game !== undefined) {
			if (game.allPlayed()) {
				return true;
			}
		}
		return false;
	}

	/* contains username + the card played*/
	getBoardCards(gameId) {
		let game = findGame(gameId);
		if (game !== undefined) {
			return game.getBoardCards();
		}
	}

	getScoreBoard(gameId) {
		let game = findGame(gameId);
		if (game !== undefined) {
			return game.getScoreBoard();
		}
	}

}

module.exports = gamesManager;