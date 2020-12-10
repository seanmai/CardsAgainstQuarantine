let _ = require('underscore');
let dbHelper = require('./cardGetter.js');

let game = class{

	//add async and await
	constructor(username, id, category, rounds, maxPlayers){
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
		// this.dealtCards = [];
		this.blackCard = null;
		this.boardCards = [];
		this.turnsLeft = [];
		this.db = new dbHelper();
	}

	setCzar(){
		let index = getUserIndex(this.czar);
		if(index !== -1){
			if(index === this.numPlayers-1){
				this.czar = this.players[0].name;
			} else {
				this.czar = this.players[++index].name;
			}
		}
	}

	getUserIndex(){
		for(let i = 0; i < this.players; i++){
			if(this.czar === this.players[i].name){
				return i;
			}
		}
		return -1;
	}

	addPlayer(username){
		if(this.numPlayers < this.maxPlayers){
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

	dealHand(){
		for(let playerIndex = 0; i < numPlayers; playerIndex++){
			while(cardIndex < 5){
				dealCard(playerIndex);
			}
		}
	}

	dealCard(index){
		let card = db.getRandomWhiteCard();
		// this.dealtCards.push(card._id);
		this.players[index].cards.push(card);
	}

	dealBlackCard(){
		let card = db.getRandomBlackCards().toArray();
		this.blackCard = card;
	}

	playWhiteCard(username, card){
		// push into board array and delete from player array 
		let played = {
			user: username,
			card: card
		}
		this.boardCards.push(played);
		let index = getUserIndex(username);
		this.turnsLeft = _.without(this.turnsLeft, username);
		this.players[index].cards = _.without(this.players[index].cards, card);
	}

	// param depends on the winning card is handled on front-end 
	// could be username or the card 
	selectRoundWinner(username){
		updateScoreboard(username);
	}

	getBoardCards(){
		return this.boardCards;
	}

	nextRound(){
		this.boardCards = [];
		dealBlackCard();
		for(let playerIndex = 0; i < numPlayers; playerIndex++){
			if(this.players[playerIndex].name !== this.czar){
				dealCard(playerIndex);
			}
		}
		setCzar();
		resetTurnsLeft();
		this.currentRound++;
	}

	resetTurnsLeft(){
		for(let i = 0; i < this.numPlayers; i++){
			if(players[0].user.name !== this.czar){
				this.turnsLeft.push(players[0].user.name);
			}
		}
	}

	allPlayed(){
		if(this.turnsLeft.length == 0){
			return true;
		}
		return false;
	}

	gameOver(){
		if(this.currentRound === this.rounds){
			return true;
		}
		return false;
	}

	getGameWinner(){
		let winner = this.players[0];
		for(let index = 1; index < numPlayers; index++){
			if(winner.score < this.players[index].score){
				winner = this.players[index];
			}
		}
		return winner;
	}

	updateScoreboard(username){
		this.players.map(function(i){
			if(i.username == username){
				i.score++;
			}
		});
	}

	getScoreBoard(){
		let scoreBoard = [];
		for(let i = 0; i < this.numPlayers; i++){
			let entry = {
				name: this.players[i].name,
				score: this.players[i].score
			};
			scoreBoard.push(entry);
		}
		return scoreBoard;
	}

	getState(){
		let state = {
			currentRound: this.currentRound,
			czar: this.czar,
			players: this.players,
			boardCards: this.boardCards,
			blackCard: this.blackCard
		}
		return state;
	}

	validPlayer(username){
		let user = _.find(this.players, function(player){
			return player.name === username;
		});
		if(user === undefined){
			return false;
		}
		return true;
	}

	setDecks(){
		this.db.getDecks(this.cardCategory);
	}

}

module.exports = game;