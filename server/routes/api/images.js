const mongoose = require('mongoose');
const router = require('express').Router();
const Images = mongoose.model('Images');

const {format} = require('util');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
var Multer = require('multer');
 
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 16 * 1024 * 1024, // no larger than 16mb, you can change as needed.
    },
});
 
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


router.post('/', multer.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  console.log("image req:", req);
  var imagePath = req.file.filename;

    // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.json({imagePath: publicUrl});
  });

  blobStream.end(req.file.buffer);

  // const newImage = new Images({
  //   imagePath: imagePath,
  // });
  // return newImage.save()
  //   .then(() => res.json({ image: newImage.toJSON() }))
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