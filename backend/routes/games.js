const router = require('express').Router();
const GamesManager = require('../gamesManager.js');
let Card = require('../models/card.model');

//create a new game
// gameInfo should contain the category, number of rounds and number 
// of max players selected bby user 
router.route('/').post((req, res) => {
	let id = GamesManager.createGame(req.username, req.gameInfo);
	res.json('game id is: ' + id);
});


// join a game with provided id 
// create a game session for user 
router.route('/:id').post((req, res) => {
	let username = req.body.username;
	let gameId = req.params.id;
	GamesManager.joinGame(username, gameId);
});

router.route('/:id/selectWinner').post((req, res) => {

});

router.route('/:id/roundWinner').post((req, res) => {

});

route.route('/:id/playCard/:cardId').post((req, res) => {
	let username = req.username;
	let gameId = req.params.id;
	let cardId = req.params.cardId;
});

module.exports = router;