var express = require('express'),
  passport = require('passport'),
  router = express.Router();

router.get('/', function (req, res) {
  var usertype = req.query.usertype;
  if (usertype == 'admin')
    res.render('login', { title: 'Admin Login', method: 'authenticate_admin' });
  if (usertype == 'student')
    res.render('login', {
      title: 'Student Login',
      method: 'authenticate_student',
    });
});

router.post(
  '/authenticate_admin',
  passport.authenticate('local-login-admin', {
    failureRedirect: '/',
    failureFlash: true,
  }),
  (req, res) => {
    req.session.usertype = 'admin';
    res.redirect('../admin/home');
  }
);

router.post(
  '/authenticate_student',
  passport.authenticate('local-login-student', {
    failureRedirect: '/',
    failureFlash: true,
  }),
  (req, res) => {
    req.session.usertype = 'student';
    res.redirect('../students/home');
  }
);

module.exports = router;
