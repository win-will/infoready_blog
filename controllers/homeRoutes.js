const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {

    res.redirect('/home');
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

router.get('/home', async (req, res) => {

  const postData = await Posts.findAll({
    include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
  }).catch((err) => { 
    res.json(err);
  });
  try {
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts)
    res.render('home', { posts,logged_in: req.session.logged_in, });

  } catch (err) {
    res.status(500).json(err);
  }

});

// {
//   "comment": "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Sit amet nisl suscipit adipiscing bibendum est ultricies. Quis risus sed vulputate odio ut enim blandit volutpat maecenas.",
//   "createdAt": "2022-02-17",
//   "postId": 5,
//   "userId": 5
// }

router.post('/home', withAuth, async (req, res) => {

  const data = {
    comment: req.body.comment,
    createdAt: req.body.createdAt,
    postId: req.body.postId,
    userId: req.session.user_id
  }
  await Comments.create(data)
    .catch((err) => {
      console.log(err);
    });

  const postData = await Posts.findAll({
    include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
  });
  
  const posts = postData.map((post) => post.get({ plain: true }));

  console.log(posts);

  res.render('home', { posts, logged_in: req.session.logged_in, });

});

router.get('/dashboard', withAuth, async (req, res) => {


    const postData = await Posts.findAll({
      where: { userId: req.session.user_id},
      include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in, });


});

router.post('/dashboard', withAuth, async (req, res) => {

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

  res.render('dashboard', { posts, logged_in: req.session.logged_in, });
    
});

router.put('/dashboard/:id', withAuth, async (req, res) => {

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

    res.render('dashboard', { posts, logged_in: req.session.logged_in, });
});

router.delete('/dashboard/:id', withAuth, async (req, res) => {

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

    res.render('dashboard', { posts, logged_in: req.session.logged_in, });
});


module.exports = router;
