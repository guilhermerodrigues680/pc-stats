const disk = require('diskusage');
const os = require('os');
const osUtils 	= require('os-utils');

async function getFreeSpace() {
  const path = os.platform() === 'win32' ? 'c:' : '/';
  try {
    const { free, available, total } = await disk.check(path);
    return { free, available, total }
  } catch (err) {
    console.error(err)
    return 0
  }
}

function getCpu() {
  return new Promise(resolve => {
    osUtils.cpuUsage(cpuUsage => resolve(cpuUsage));
  })
}

module.exports = {
  getFreeSpace,
  getCpu
}
