var _ = require('underscore');
let Game = require('./game.js');
const shortid = require("custom-id");
const games = require('./routes/games.js');

//add async and await

let gamesManager = class {

	constructor() {
		this.gamesList = [];
		this.allPlayers = [];
	}

	createGame(message) {
		let gameId = this.generateGameId();
		let game = new Game(message.username, gameId, message.category, message.rounds, message.max_player);
		this.gamesList.push(game);
		game.initCards();
		return gameId;
	}

	// Should check if gameroom doesn't exist first ie) validGameId(gameId) then getGame(gameId)
	// Don't join non-existent gameId's for now
	findGame(gameId) {
		let game = this.gamesList.filter((entry) => {
			return entry.id === gameId;
		});
		return game[0];
	}

	deleteGame(gameId) {
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
		let game = this.findGame(gameId);
		if (game !== undefined) {
			game.selectRoundWinner(username);
		}
	}

	startNextRound(gameId) {
		let game = this.findGame(gameId);
		if (game !== undefined) {
			game.nextRound();
		}
	}

	isGameOver(gameId) {
		let game = this.findGame(gameId);
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
		let game = this.findGame(gameId);
		if (game !== undefined) {
			return game.getBoardCards();
		}
	}

	getScoreBoard(gameId) {
		let game = this.findGame(gameId);
		if (game !== undefined) {
			return game.getScoreBoard();
		}
	}

}

module.exports = gamesManager;