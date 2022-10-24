const router = require('express').Router();
const { Posts, User } = require('../../models');
const { restore } = require('../../models/User');
// const withAuth = require('../../utils/auth');

// The `/api/blog` endpoint

// get all posts
router.get('/', async (req, res) => {
  // find all products
//   console.log(req.session);
  console.log(req.sessionID);
//   req.session.id
//   if (req.session.logged_in) {
    try {
        const postData = await Posts.findAll({
            include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
          });
        
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {posts});
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }

//   } else {
//     res.status(401).json("Authorization Required");
    
//   }
  
});

// get all posts from a user
router.post('/:id', async (req, res) => {
  // find all posts for a user
    try {
      const postData = await Posts.findAll({
        where: { userId: req.params.id},
        include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
      });
        res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// get one post
router.get('/:id', async (req, res) => {
  // find a single post by its `id`

  try {
    const postData = await Posts.findByPk(req.params.id, {
        include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
      {
    "title": "Pharetra diam sit",
    "content": "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Sit amet nisl suscipit adipiscing bibendum est ultricies. Quis risus sed vulputate odio ut enim blandit volutpat maecenas.",
    "createdAt": "2022-02-17",
    "updatedAt": "2022-02-17",
    "userId": 5
  }
  */
  Posts.create(req.body)
    .then((post) => {

      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update post 
  /* req.body should look like this...
      {
    "title": "Pharetra diam sit",
    "content": "Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Sit amet nisl suscipit adipiscing bibendum est ultricies. Quis risus sed vulputate odio ut enim blandit volutpat maecenas.",
    "createdAt": "2022-02-17",
    "updatedAt": "2022-02-17",
    "userId": 5
  }
  */
  await Posts.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
        console.log(post);
        res.status(200).json("Update Successful!");
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;