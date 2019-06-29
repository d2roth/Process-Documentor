const User = require('../models/user');

exports.login = (req, res) => {
  res.render('sessions/login', {
    title: 'Login'
  });
};

exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then( user => {
    if( user === null ){
      req.flash('error', 'Oops! Those credentials do not match anything we have on record. Try again!')
      res.redirect('/login');
    }
    user.authenticate( req.body.password, (err, isMatch) =>{
      if( err) throw new Error(err);

      if( isMatch){
        req.session.userId = user.id;
        req.flash('success', 'You are now logged in!');
        res.redirect('/');
      } else {
        req.flash('error', 'Oops! Those credentials do not match anything we have on record. Try again!');
        res.redirect('/login');
      }
    })
  })
  .catch( err => {
    req.flash('error', `ERROR: ${err}`);
    res.redirect('/login');
  })
};

exports.logout = (req, res) => {
  req.session.userId = null;
  req.flash('success', 'You have logged out now!');
  res.redirect('/');
};