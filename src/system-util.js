const disk = require('diskusage');
const os = require('os');
const osUtils 	= require('os-utils');
const util = require('./util');


async function getFreeSpace() {
  const path = os.platform() === 'win32' ? 'c:' : '/';
  try {
    const { free, available, total } = await disk.check(path);
    console.log(`Free space: ${free}`, `Free space: ${util.formatBytes(free)}`);
    console.log(`Available space: ${available}`, `Available space: ${util.formatBytes(available)}`);
    console.log(`Total space: ${total}`, `Total space: ${util.formatBytes(total)}`);
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

// (async () => {
//   await getFreeSpace()
//   const cpuUsage = await getCpu();
//   console.log(cpuUsage)
// })();

module.exports = {
  getFreeSpace,
  getCpu
}
