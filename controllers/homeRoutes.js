const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {

    res.render('home', {logged_in: req.session.logged_in,});
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/dashboard', async (req, res) => {

    const postData = await Posts.findAll({
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    }).catch((err) => { 
      res.json(err);
    });
    try {
      const posts = postData.map((post) => post.get({ plain: true }));
      // console.log(posts)
      res.render('dashboard', { posts,logged_in: req.session.logged_in, });

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

router.get('/yourposts', withAuth, async (req, res) => {


    const postData = await Posts.findAll({
      where: { userId: req.session.user_id},
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('yourposts', { posts, logged_in: req.session.logged_in, });


});

router.post('/yourposts', withAuth, async (req, res) => {

  const data = {
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    userId: req.session.user_id
  }
  await Posts.create(data)
    .catch((err) => {
      console.log(err);
    });

  const postData = await Posts.findAll({
    where: { userId: req.session.user_id},
    include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
  });
  
  const posts = postData.map((post) => post.get({ plain: true }));

  console.log(posts);

  res.render('yourposts', { posts, logged_in: req.session.logged_in, });
    
});

router.put('/yourposts/:id', withAuth, async (req, res) => {

  const data = {
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    userId: req.session.user_id
  }

  await Posts.update(data, {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
      // console.log(err);
      console.log(err);
    });

    const postData = await Posts.findAll({
      where: { userId: req.session.user_id},
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('yourposts', { posts, logged_in: req.session.logged_in, });
});

router.delete('/yourposts/:id', withAuth, async (req, res) => {

  console.log(req.params.id);
  await Posts.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
      // console.log(err);
      console.log(err);
    });

    const postData = await Posts.findAll({
      where: { userId: req.session.user_id},
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('yourposts', { posts, logged_in: req.session.logged_in, });
});


module.exports = router;
