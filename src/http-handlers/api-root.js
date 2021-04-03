const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({
    message: "ok - api"
  });
});

module.exports = router;
