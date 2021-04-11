const router = require("express").Router();

router.use("/articles", require("./articles"));
router.use("/comments", require("./comments"));
router.use("/images", require("./images"));

module.exports = router;
