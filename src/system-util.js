const util = require('./util');

const os = require('os');

// setInterval(() => {
//   const cpus = os.cpus();
//   console.log(cpus);
//   cpu(cpus)

//   console.log(util.formatBytes(os.totalmem()));
//   console.log(util.formatBytes(os.freemem()));
// }, 1000);

// setInterval(() => {
//   const lastCpuInfo = os.cpus();
// }, 1000)

/**
 * average usage since system boot
 * @param {os.CpuInfo[]} cpuInfo
 */
function cpu(cpuInfo) {
  for(var i = 0, len = cpuInfo.length; i < len; i++) {
    console.log("CPU %s:", i);
    var cpu = cpuInfo[i], total = 0;

    for(var type in cpu.times) {
        total += cpu.times[type];
    }

    for(type in cpu.times) {
        console.log("\t", type, Math.round(100 * cpu.times[type] / total));
    }
  }
}

/**
 * average usage since system boot
 * @param {os.CpuInfo[]} lastCpuInfo
 * @param {os.CpuInfo[]} currentCpuInfo
 */
async function cpuAvg(ms=1000) {
  const lastCpuInfo = os.cpus();
  // console.log(Date.now())
  /** @type os.CpuInfo[] */
  const currentCpuInfo = await new Promise(resolve => setTimeout(() => resolve(os.cpus()), ms));
  // console.log(Date.now());

  const totalCpus = lastCpuInfo.length;

  const cpuDiff = [];
  for (let idx = 0; idx < totalCpus; idx++) {
    // console.log("CPU", idx)
    const cpuTimesDiff = {}
    for (const type in lastCpuInfo[idx].times) {
      cpuTimesDiff[type] = currentCpuInfo[idx].times[type] - lastCpuInfo[idx].times[type]
      // console.log(type, cpuTimesDiff[type]);
    }
    cpuDiff.push(cpuTimesDiff);
  }

  const cpuDiffPercent = [];
  for(const [idx, cpu] of cpuDiff.entries()) {
    let total = 0;
    for(const type in cpu) {
      total += cpu[type];
    }

    const cpuIdxDiffPercent = {};
    for(const type in cpu) {
      //console.log("\t", type, Math.round(100 * cpu[type] / total));
      cpuIdxDiffPercent[type] = cpu[type] / total;
    }
    cpuDiffPercent.push(cpuIdxDiffPercent);
  }

  return cpuDiffPercent;
}


const f = (async () => {
  try {
    const val = await cpuAvg();
    // console.log('Val', val)
    for (const [idx, cpu] of val.entries()) {
      let str = `CPU ${idx} - `;
      for (const type in cpu) {
        str += type + ": " + Math.round(cpu[type] * 100) + "%";
        str += ", \t";
      }
      console.log(str)
    }
  } catch (error) {
    console.log('Deu erro', error)
  }
  console.log("");
});
//f();

// setInterval(() => {
//   f();
// }, 1000)

module.exports = {
  f
}
