const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../models/user.model');

router.route('/login').get((req, res) => {
    // res.render login react front-end
})

router.route('/login/fail').get((req, res) => {
    res.status(401).send({ error: "login failed" });
})

router.route('/register/fail').get((req, res) => {
    res.status(401).send({ error: "user already exists" });
})

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/users/login/fail'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.send({user: user, redirect_path: "/"});
        });
    })(req, res, next)
});

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
})

router.route('/:id').get((req, res) => {
    // Use middleware to auth access own acct
})

router.route('/register').post(async (req, res) => {
    const username = await User.findOne({username: req.body.username}).exec();
    if (username === null) {
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
    } else {
        console.log('User Already Exists');
        res.redirect('/register/fail');
    }   
});

module.exports = router;