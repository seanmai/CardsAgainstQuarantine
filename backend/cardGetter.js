require('mongoose');
var _ = require('underscore');
let Card = require('../models/card.model');

let cardGetter = class{

	constructor(){
		//contains the ids of cards dealt for a game
		// this.usedCards = [];
		this.deckBlack = [];
		this.deckWhite = [];
	}

	getRandomWhitecard(){
		let index = getRandomNumber(0,deckWhite.length-1);
		let card = this.deckWhite[index];
		this.deckWhite = _.without(this.deckWhite, card);
		return card;
	}	

	getRandomBlackcard(){
		getBlackCards(category);
		let index = getRandomNumber(0,deckBlack.length-1);
		let card = this.deckBlack[index];
		this.deckBlack = _.without(this.deckBlack, card);
		return card;
	}

	getDecks(cat){
		Card.find({type:'white',category:cat}).then(cards => {
        	this.deckWhite = cards;
        })
        .catch(err => 

		);

		Card.find({type:'black',category:cat}).then(cards => {
        	this.deckBlack = cards;
        })
        .catch(err => 

		);
	}

	getRandomNumber(min, max){
		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min) + min);
	}

}

module.exports = cardGetter;