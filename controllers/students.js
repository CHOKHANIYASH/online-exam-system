var express = require('express'),
  router = express.Router();

const student = require('../models/student');

var default_username = 'User Name';
// let student = Student.student

var default_student = {
  username: 'Username',
  password: 'Password',
  name: 'Name',
  rollno: 'Roll Number',
};

var default_username = 'User Name';

router.get('/home', isLoggedInAsStudent, function (req, res) {
  res.render('students/home', {
    title: 'Student Home Page',
    student: default_student,
  });
});

router.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/new', isLoggedIn, function (req, res) {
  res.render('students/new', {
    title: 'Add New Student',
    student: default_student,
  });
});

router.post('/create', isLoggedIn, async function (req, res) {
  // TO DO: Ensure that the student and course exists
  // TO DO: Add failure cases
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const rollno = req.body.rollno;
  const data = await student.findOne({ username });
  if (data) {
    await req.flash('error', 'Student already exist');
    res.redirect('/students/new');
  } else {
    const newStudent = new student({ username, name, rollno });
    await student.register(newStudent, password);
    await req.flash('success', 'Student created');
    res.redirect('/admin/home');
  }
});

router.get('/get_username_edit', isLoggedIn, function (req, res) {
  res.render('students/get_username_edit', {
    title: 'Get Username',
    username: default_username,
  });
});

router.get('/edit', isLoggedIn, async function (req, res) {
  //Failure renders edit if update is incorrect
  var username = req.query.username;
  const studentData = await student.findOne({ username });
  console.log(studentData);
  if (studentData)
    res.render('students/edit', { title: 'Edit Student', studentData });
  else res.redirect('/students/get_username_edit');
});

router.get('/view', async (req, res) => {
  const students = await student.find({});
  res.render('students/view', { students });
});

router.post('/update', isLoggedIn, async function (req, res) {
  // TO DO: Ensure that the student and course exists
  // TO DO: Add failure cases
  var student = {
    username: req.body.username,
    name: req.body.name,
    rollno: req.body.rollno,
  };
  // const passwo
  var prevusername = req.body.prevusername;
  const data = await student.findOneAndUpdate({ prevusername }, { ...student });

  if (!data)
    res.render('students/edit', { title: 'Edit Student', student: student });
  else res.redirect('../admin/home');
});

router.get('/get_username_delete', isLoggedIn, function (req, res) {
  var default_username = 'User Name';
  res.render('students/get_username_delete', {
    title: 'Get Username',
    username: default_username,
  });
});

router.post('/delete', isLoggedIn, async function (req, res) {
  // TO DO: Ensure that the student and course exists
  // TO DO: Add failure cases
  var username = req.body.username;
  const studentData = await student.findOne({ username });

  if (studentData) {
    await student.findOneAndDelete({ username });
    await req.flash('success', 'Student deleted');
    res.redirect('../admin/home');
  } else {
    await req.flash('error', 'Student do not exist');
    res.redirect('../students/get_username_delete');
  }
});

module.exports = router;

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() && req.session.usertype == 'admin') return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

function isLoggedInAsStudent(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() && req.session.usertype == 'student') return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
