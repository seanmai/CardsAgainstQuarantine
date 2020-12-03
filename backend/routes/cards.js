const router = require('express').Router();
let Card = require('../models/card.model');

router.route('/').get((req, res) => {
    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json(err));
})

router.route('/add').post((req, res) => {
    
    const newCard = new Card({});

    newCard.save()
        .then(() => res.json('Card added.'))
        .catch(err => res.status(400).json(err));
});

router.route('/id').delete((req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(() => res.json('Card deleted'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;