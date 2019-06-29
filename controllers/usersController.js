const User = require( '../models/user');
const sessionsController = require( '../controllers/sessionsController');

exports.new = (req, res) => {
  let edited_user = req.session.user ? req.session.user : null;
  req.session.user = null;

  res.render('users/new', {
    title: 'New User',
    user: edited_user
  })
}
exports.create = (req, res) => {

  User.create(req.body.user)
  .then(() => {
    req.flash('success', 'You are now registered!');
    req.body.email = req.body.user.email;
    req.body.password = req.body.user.password;
    sessionsController.authenticate(req, res);
    // res.redirect('/login');
  })
  .catch(err => {
    req.body.user.password = null;
    req.body.user.passwordConfirmation = null;
    req.session.user = req.body.user;
    req.flash('error', `User ERROR: ${err}`)
    res.redirect('/users/new');
  })
}