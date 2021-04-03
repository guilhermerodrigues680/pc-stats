const hrStart = process.hrtime(); // Necessario ser o primeiro para medir o tempo de start
const app = require('./src/app');
const { name: pkgName, version: pkgVersion } = require('./package.json');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const hrEnd = process.hrtime(hrStart);
  const started = `${hrEnd[0]}.${Math.round(hrEnd[1] / 1000000)}s`;
  console.log(`${pkgName} ${pkgVersion} (powered by guilhermerodrigues680) started in ${started}. Listening on: http://localhost:${PORT}`);
});
