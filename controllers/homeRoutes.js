const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {

    res.redirect('/home');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Prevent non logged in users from viewing the homepage
router.get('/home', async (req, res) => {
  try {

    res.render('home');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/yourposts', async (req, res) => {

  if (req.session.logged_in) {
    const postData = await Posts.findAll({
      where: { userId: req.params.id},
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('yourposts', { posts });
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {

  if (req.session.logged_in) {
    const postData = await Posts.findAll().catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts });
    return;
  }

  res.render('login');
});

module.exports = router;
