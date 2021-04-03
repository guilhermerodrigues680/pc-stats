const systemUtil = require('../system-util');

async function getPcStats() {
  const cpu = await systemUtil.getCpu();
  const space = await systemUtil.getFreeSpace();
  return {
    cpu,
    space,
    time: Date.now()
  }
}

module.exports = (io) => {
  setInterval(async () => io.emit('pc-stats', await getPcStats()), 2000)
}
