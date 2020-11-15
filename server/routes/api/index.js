const router = require('express').Router();

router.use('/articles', require('./articles'));
router.use('/comments', require('./comments'));
router.use('/authenticate', require('./authenticate'));
router.use('/create', require('./create'));

module.exports = router;