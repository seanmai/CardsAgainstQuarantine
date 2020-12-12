var _ = require('underscore');
let Card = require('./models/card.model');

let game = class {

	//add async and await
	constructor(username, id, category, rounds, maxPlayers) {
		this.id = id;
		this.cardCategory = category;
		this.rounds = rounds;
		this.maxPlayers = maxPlayers;
		this.numPlayers = 1;
		this.currentRound = 0;
		this.czar = username;
		let user = {
			name: username,
			cards: [],
			score: 0
		}
		this.players = [user];
		// stores the id of the cards 
		this.whiteCards = [];
		this.blackCards = [];
		this.dealtCards = [];
		this.blackCard = null;
		this.boardCards = [];
		this.turnsLeft = [];
	}

	setCzar() {
		let index = this.getUserIndex(this.czar);
		if (index !== -1) {
			if (index === this.numPlayers - 1) {
				this.czar = this.players[0].name;
			} else {
				this.czar = this.players[++index].name;
			}
		}
	}

	getUserIndex(username) {
		for (let i = 0; i < this.numPlayers; i++) {
			if (username === this.players[i].name) {
				return i;
			}
		}
		return -1;
	}

	addPlayer(username) {
		if (this.numPlayers < this.maxPlayers) {
			let user = {
				name: username,
				cards: [],
				score: 0
			}
			this.players.push(user);
			this.turnsLeft.push(username);
			this.numPlayers++;
			return true;
		}
		return false;
	}


	initCards() {
		Card.find({ category: this.cardCategory, type: 'white' }).exec((err, cards) => {
			if (err) console.log(err)
			else {
				cards.forEach(card => {
					this.whiteCards.push(card.content);
				});
			}
		});
		Card.find({ category: this.cardCategory, type: 'black' }).exec((err, cards) => {
			if (err) console.log(err)
			else {
				cards.forEach(card => {
					this.blackCards.push(card.content);
				});
			}
		});
	}

	getRandomCard(type) {
		let cardsList = []
		switch (type) {
			case 'white':
				cardsList = this.whiteCards;
				break;
			case 'black':
				cardsList = this.blackCards;
				break;
		}
		let index = Math.floor(Math.random() * cardsList.length);
		return cardsList.splice(index, 1)[0];

	}

	dealCard(index) {
		let card = this.getRandomCard('white');

		this.dealtCards.push(card);
		this.players[index].cards.push(card);
	}

	dealHand() {
		for (let playerIndex = 0; playerIndex < this.numPlayers; playerIndex++) {
			for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
				this.dealCard(playerIndex);
			}
		}
	}

	dealBlackCard() {
		let card = this.getRandomCard('black');
		this.dealtCards.push(card);
		this.blackCard = card;
	}

	playWhiteCard(username, card) {
		// push into board array and delete from player array 
		let played = {
			user: username,
			card: card
		}
		this.boardCards.push(played);
		let index = this.getUserIndex(username);
		this.turnsLeft = _.without(this.turnsLeft, username);
		console.log(index)
		this.players[index].cards = _.without(this.players[index].cards, card);
	}



	// param depends on the winning card is handled on front-end 
	// could be username or the card 
	selectRoundWinner(username) {
		this.updateScoreboard(username);
	}

	getBoardCards() {
		return this.boardCards;
	}

	nextRound() {
		this.boardCards = [];
		this.dealBlackCard();
		for (let playerIndex = 0; playerIndex < this.numPlayers; playerIndex++) {
			if (this.players[playerIndex].name !== this.czar) {
				this.dealCard(playerIndex);
			}
		}
		this.setCzar();
		this.resetTurnsLeft();
		this.currentRound++;
	}

	resetTurnsLeft() {
		for (let i = 0; i < this.numPlayers; i++) {
			if (this.players[0].name !== this.czar) {
				this.turnsLeft.push(this.players[0].name);
			}
		}
	}

	allPlayed() {
		if (this.turnsLeft.length == 0) {
			return true;
		}
		return false;
	}

	// ready(){
	// 	return (this.numPlayers === this.maxPlayers);
	// }

	// startGame(){

	// }

	// We only have the max rds win condition at the moment
	gameOver() {
		if (this.currentRound === this.rounds) {
			return true;
		}
		return false;
	}

	getGameWinner() {
		let winner = this.players[0];
		for (let index = 1; index < this.numPlayers; index++) {
			if (winner.score < this.players[index].score) {
				winner = this.players[index];
			}
		}
		return winner;
	}

	updateScoreboard(username) {
		this.players.map(function (i) {
			if (i.username == username) {
				return (
					{
						name: i.name,
						cards: i.cards,
						score: i.score + 1
					}
				)

			}
			else {
				return i
			}
		});
	}

	getScoreBoard() {
		let scoreBoard = [];
		for (let i = 0; i < this.numPlayers; i++) {
			let entry = {
				name: this.players[i].name,
				score: this.players[i].score
			};
			scoreBoard.push(entry);
		}
		return scoreBoard;
	}

	getState() {
		let state = {
			currentRound: this.currentRound,
			czar: this.czar,
			players: this.players,
			boardCards: this.boardCards,
			blackCard: this.blackCard
		}
		return state;
	}

	validPlayer(username) {
		let user = _.find(this.players, function (player) {
			return player.name === username;
		});
		if (user === undefined) {
			return false;
		}
		return true;
	}
}

module.exports = game;