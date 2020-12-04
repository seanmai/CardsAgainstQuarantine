const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../models/user.model');

router.route('/login').get((req, res) => {

})

router.route('/login'), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    // TODO: Show flash message on client side 
    failureFlash: true
})

router.route('/logout').get((req, res) => {

})

router.route('/:id').get((req, res) => {
    // Use middleware to auth access own acct
})

router.route('/register').post(async (req, res) => {
    // Temp logic -- will need to use an auth middleware like passport or something
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.json('User added.'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;