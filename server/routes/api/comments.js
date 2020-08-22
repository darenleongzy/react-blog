const mongoose = require('mongoose');
const router = require('express').Router();
const Comments = mongoose.model('Comments');

router.post('/', (req, res, next) => {
  const { body } = req;
  console.log(body);
  console.log("hi");

  if(!body.text) {
    return res.status(422).json({
      errors: {
        text: 'is required',
      },
    });
  }

  if(!body.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!body.article) {
    return res.status(422).json({
      errors: {
        article: 'is required',
      },
    });
  }

  const finalComment = new Comments(body);
  return finalComment.save()
    .then(() => res.json({ comment: finalComment.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Comments.find()
    .sort({ createdAt: 'descending' })
    .then((comments) => res.json({ comments: comments.map(comment => comment.toJSON()) }))
    .catch(next);
});

router.get('/article/:articleId', (req, res, next) => {
  return Comments.find({article: req.params.articleId})
    .sort({ createdAt: 'descending' })
    .then((comments) => res.json({ comments: comments.map(comment => comment.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Comments.findById(id, (err, comment) => {
    if(err) {
      return res.sendStatus(404);
    } else if(comment) {
      req.comment = comment;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  console.log(id);
  return res.json({
    comment: req.comment.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.text !== 'undefined') {
    req.comment.text = body.text;
  }

  if(typeof body.username !== 'undefined') {
    req.comment.username = body.username;
  }

  if(typeof body.body !== 'undefined') {
    req.comment.article = body.article;
  }

  return req.comment.save()
    .then(() => res.json({ comment: req.comment.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Comments.findByIdAndRemove(req.comment._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;