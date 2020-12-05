var _ = require('underscore');
let Game = require('./game.js');
let shortid = require('shortid');

//add async and await

let games = class{

	constructor(){
		this.gamesList = [];
	}	

	createGame(userInfo, gameInfo){
		let gameId = generateGameId();
		let game = new Game(userInfo.username, gameId, gameInfo.category, gameInfo.rounds, gameInfo.maxPlayers);
		this.gamesList.push(game);
		return gameId;
	}

	findGame(gameId){
		return _.findWhere(this.gamesList, {id:gameId});
	}

	deleteGame(id){

	}

	startGame(id){
		let game = findGame(id);
		game.dealCards();
		game.playBlackCard();
		console.log("starting game..");
	}

	joinGame(player, gameId){
		let game = findGame(gameId);
		//check if game found 
		if(game.addPlayer(player)){
			
		} 

	}

	generateGameId(){
		// check if game with that id already exists 
		// otherwise generate another 
		return shortid.generate();
	}

}

module.exports = games;