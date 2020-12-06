const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../models/user.model');

router.route('/login').get((req, res) => {
    // TODO: Replace this debugging console log
    console.log('failure')
})

router.route('/login').post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    // TODO: Show flash message on client side 
    failureFlash : true
}))

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
})

router.route('/:id').get((req, res) => {
    // Use middleware to auth access own acct
})

router.route('/register').post(async (req, res) => {
    try {
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({username, password});

        newUser.save()
        .then(() => res.json('User added.'))
        .catch(err => res.status(400).json(err));
    } catch {
        res.redirect('/register');
    }
});

module.exports = router;