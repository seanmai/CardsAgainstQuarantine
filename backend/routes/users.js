const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').get((req, res) => {

})

router.route('/login').post((req, res) => {
    
})

router.route('/logout').get((req, res) => {

})

router.route('/:id').get((req, res) => {
    // Use middleware to auth access own acct
})

router.route('/register').post((req, res) => {
    // Temp logic -- will need to use an auth middleware like passport or something
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.json('User added.'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;