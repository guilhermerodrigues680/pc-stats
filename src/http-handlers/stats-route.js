const router = require('express').Router();

// const systemUtil = require('./system-util');

// (async () => {
//   await systemUtil.getFreeSpace()
//   const cpuUsage = await systemUtil.getCpu();
//   console.log(cpuUsage)
// })();

router.get('/stats', (req, res) => {
  res.send({
    message: "stats"
  });
});

module.exports = router;
