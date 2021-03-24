const mongoose = require('mongoose');
const router = require('express').Router();
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
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
 
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res, next) => {
  console.log("image req:", req);
  var imagePath = req.file.filename;
  const newImage = new Images({
    imagePath: imagePath,
  });
  return newImage.save()
    .then(() => res.json({ image: newImage.toJSON() }))
});

router.get('/', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Images.findById(id, (err, image) => {
    if(err) {
      return res.sendStatus(404);
    } else if(image) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

// router.get('/:id', (req, res, next) => {
//   return res.json({
//     article: req.article.toJSON(),
//   });
// });

// router.patch('/:id', (req, res, next) => {
//   const { body } = req;

//   if(typeof body.title !== 'undefined') {
//     req.article.title = body.title;
//   }

//   if(typeof body.author !== 'undefined') {
//     req.article.author = body.author;
//   }

//   if(typeof body.body !== 'undefined') {
//     req.article.body = body.body;
//   }

//   return req.article.save()
//     .then(() => res.json({ article: req.article.toJSON() }))
//     .catch(next);
// });

// router.delete('/:id', (req, res, next) => {
//   return Articles.findByIdAndRemove(req.article._id)
//     .then(() => res.sendStatus(200))
//     .catch(next);
// });

module.exports = router;