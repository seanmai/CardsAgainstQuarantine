var _ = require('underscore');

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
		this.dealtCards = [];
		this.blackCard = null;
		this.boardCards = [];
		// let score = {user: username, score: 0};
		// this.scoreboard.push(score);
	}

	setCzar(){
		this.czar = this.players[this.players.indexOf(this.czar)+1] || this.players[0];
	}

	addPlayer(username){
		if(this.numPlayers < this.maxPlayers){
			let user = {
				name: username,
				cards: [],
				score: 0
			}
			this.players.push(user);
			// let score = {user: username, score: 0};
			// this.scoreboard.push(score);
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
		// must get white card from database
		// let card = db.getRandomWhiteCard();
		while(!validCard(card._id)){
			// card = db.getRandomWhiteCard();
		}
		this.dealtCards.push(card._id);
		this.players[index].cards.push(card);
		
		// let number = 0;
		// for(let i = 0; i < numPlayers; i++){
		// 	let index = 0;
		// 	while(index < 5){
		// 		number = getRandomNumber(cards.length);
		// 		this.players[i].cards[index] = cards[index];
		// 		cards = _.without(cards, cards[index]);
		// 		index++;
		// 	}
		// }
	}

	validCard(id){
		if(this.dealtCards.indexOf(id) === -1){
			return true;
		} 
		return false;
	}

	dealBlackCard(){
		// must get a random black card from the database
		// let card = db.getRandomBlackCards().toArray();
		while(!validCard(card._id)){
			// card = db.getRandomWhiteCard();
		}
		this.dealtCards.push(card._id);
		this.blackCard = card;
	}

	playWhiteCard(username, card){
		// push into board array and delete from player array 
		let played = {
			user: username,
			card: card
		}
		this.boardCards.push(played);
		let index = this.players.indexOf(username);
		this.players[index].cards = _.without(this.players[index].cards, card);
	}

	// param depends on the winning card is handled on front-end 
	// could be username or the card 
	selectRoundWinner(username){
		updateScoreboard(username);
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
		this.currentRound++;
	}

	// ready(){
	// 	return (this.numPlayers === this.maxPlayers);
	// }

	// startGame(){

	// }

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

	// getRandomNumber(max){
	// 	return Math.floor {
	// 		Math.random() * (max-min)+min;
	// 	}
	// }

}

module.exports = game;