var _ = require('underscore');

let Game = require('./game.js');

let games = class{

	constructor(){
		this.gamesList = [];
	}	

	createGame(userInfo, gameInfo){
		let game = new Game(userInfo.username, gameInfo.id, gameInfo.category, gameInfo.rounds, gameInfo.maxPlayers);
		this.gamesList.push(game);
	}

	findGame(gameId){
		return _.findWhere(this.gamesList, {id:gameId});
	}

	deleteGame(id){

	}

	startGame(){
		console.log("starting game..");
	}

	joinGame(player, gameId){

	}

}

module.exports = games;