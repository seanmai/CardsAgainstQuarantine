var _ = require('underscore'),

const Game = require('game.js');

let games = class{

	constructor(){
		this.games = [];
	}	

	createGame(userInfo, gameInfo){
		let game = new Game(userInfo.username, gameInfo.category, gameInfo.rounds, gameInfo.maxPlayers);
	}

	findGame(gameId){
		return _.findWhere(this.games, {id:gameId});
	}

	deleteGame(id){

	}

	startGame(){

	}

	joinGame(player, gameId){

	}

}

module.exports = games;