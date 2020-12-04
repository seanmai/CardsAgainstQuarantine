const router = require('express').Router();
let Card = require('../models/card.model');
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newCategory = new Category({});

    newCategory.save()
        .then(() => res.json('Category added.'))
        .catch(err => res.status(400).json(err));
});

// Change to put request later
router.route('/:id').post((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.name = req.body.name;
            category.save()
                .then(() => res.json('Category updated.'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

// Deletes category and all cards in that category
router.route('/:id').delete((req, res) => {
    let name = '';
    Catagory.findById(id, (category) => {
        name = category.name;
    });
    Card.deleteMany({category: name})
        .then(() => res.json('Cards deleted'))
        .catch(err => res.status(400).json(err));
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json('Category deleted'))
        .catch(err => res.status(400).json(err));
});

router.route('/cards').get((req, res) => {
    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json(err));
});

router.route('/cards/add').post((req, res) => {
    const content = req.body.content;
    const type = req.body.type;
    const category = req.body.category;

    const newCard = new Card({});

    newCard.save()
        .then(() => res.json('Card added.'))
        .catch(err => res.status(400).json(err));
});

// Change to put
router.route('/cards/:id').post((req, res) => {
    Card.findById(req.params.id)
        .then(card => {
            card.content = req.body.content;
            card.type = req.body.type;
            card.category = req.body.category;
            card.save()
                .then(() => res.json('Card updated.'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

router.route('/cards/:id').delete((req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(() => res.json('Card deleted'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;