let game = class{

	constructor(username, category, rounds, maxPlayers){
		this.cardCategory = category;
		this.rounds = rounds;
		this.maxPlayers = maxPlayers;
		this.numPlayers = 1;
		this.currentRound = 0;
		this.scoreboard = [];
		let user = {
			name: username,
			cards: [];
		}
		this.players = [user];
		this.czar = user;
	}	

	setCzar(){
		this.czar = this.players[this.players.indexOf(this.czar)+1] || this.players[0];
	}

	addPlayer(user){
		this.players.push(user);
		let score = {user: user, score: 0};
		this.scoreboard.push(score);
	}

	dealCards(){

	}

	playBlackCard(){

	}

	playWhiteCard(user, card){

	}



}

module.exports = game;