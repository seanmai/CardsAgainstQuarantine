const router = require('express').Router();

router.route('/').get((req, res) => {
     // TODO: Replace this debugging console log
    res.json("login successful")
});

module.exports = router;