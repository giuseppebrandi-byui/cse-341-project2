const router = require('express').Router();

const passport = require('passport');


router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/customers', require('./customers'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;