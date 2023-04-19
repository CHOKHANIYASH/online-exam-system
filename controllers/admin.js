var express = require('express'),
  router = express.Router(),
  admin = require('../models/admin');

router.get('/home', isLoggedIn, function (req, res) {
  res.render('admin/home', { title: 'Options' });
});

router.get('/register', function (req, res) {
  var default_admin = {
    username: 'username',
    password: 'Password',
    name: 'Name',
    institute: 'institute name',
    special_code: 'special code',
  };

  res.render('admin_register', {
    title: 'Add New Admin',
    admin: default_admin,
  });
});

router.post('/register', async function (req, res) {
  const { username, password, name, institute, special_code } = req.body;
  if (special_code == 2580) {
    const data = await admin.findOne({ username });
    if (data) {
      await req.flash('error', 'error occured');
      res.redirect('/admin/register');
    } else {
      const newAdmin = new admin({ username, name, institute });
      await admin.register(newAdmin, password);
      await req.flash('success', 'Admin Regisered');
      res.redirect('/');
    }
    await req.flash('error', 'error occured');
  }
});

router.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() && req.session.usertype == 'admin') {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}
