const router = require('express').Router();
const Games = require('../games.js');
let Card = require('../models/card.model');

//create a new game
router.route('/').post((req, res) => {
	Games.createGame(req.userinfo);
});


// join a game with provided id 
// create a game session for user 
router.route('/:id').post((req, res) => {
	let username = req.body.username;
	let gameId = req.params.id;
<<<<<<< HEAD
=======
	console.log("ahfahjvdfchad");
>>>>>>> added game router and game classes
});

router.route('/:id/selectWinner').post((req, res) => {

});

route.route('/:id/playCard/:cardId').post((req, res) => {
	let username = req.username;
	let gameId = req.params.id;
	let cardId = req.params.cardId;
});

module.exports = router;