const mongoose = require('mongoose');
const router = require('express').Router();
// router.use('/comments', require('./comments'));
const Articles = mongoose.model('Articles');
const Images = mongoose.model('Images');
var fs = require('fs');
var path = require('path');
require('dotenv/config');

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("./images/"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res, next) => {
  console.log('post detected');
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }
  if(!body.image) {
    return res.status(422).json({
      errors: {
        image: 'is required',
      },
    });
  } 
  console.log(body);
  let image = path.resolve("./images") + "/" + body.image;
  const newArticle = new Articles({
    title: body.title,
    author: body.author,
    body: body.body,
    image: image,
  });

  return newArticle.save()
    .then(() => res.json({ article: newArticle.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Articles.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    article: req.article.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }
  console.log(body.image);
  if(typeof body.image !== 'undefined') {
    console.log('changing');
    let image = path.resolve("./images") + "/" + body.image;
    req.article.image = image;
    console.log('image',req.article.image);
  }

  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Articles.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;