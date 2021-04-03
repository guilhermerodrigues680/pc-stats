// const systemUtil = require('./system-util');

// (async () => {
//   await systemUtil.getFreeSpace()
//   const cpuUsage = await systemUtil.getCpu();
//   console.log(cpuUsage)
// })();

const hrStart = process.hrtime(); // Necessario ser o primeiro para medir o tempo de start
const { name: pkgName, version: pkgVersion } = require('../package.json');
const path = require('path');
const express = require('express');
// const httpServer = require("http").createServer();
const app = express();
const PORT = 3000;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {});

io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   socket.username = username;
  console.log('ola')
  next();
});

io.on("connection", (socket) => {
  // ...
  console.log('algo')
  socket.emit("users", "userss");

  socket.onAny((eventName, ...args) => {
    console.log(eventName, args, 'ei');
  });

  socket.on("debugss", socket => {
    console.log('debugss', socket)
  });

  socket.on('disconnect', function() {
    console.log('Got disconnect!');
  })
});


app.use(express.static(path.join(__dirname, 'static')));
httpServer.listen(PORT, () => {
  const hrEnd = process.hrtime(hrStart);
  const started = `${hrEnd[0]}.${Math.round(hrEnd[1] / 1000000)}s`;
  console.log(`${pkgName} ${pkgVersion} (powered by guilhermerodrigues680) started in ${started}. Listening on: http://localhost:${PORT}`);
});
// WARNING !!! app.listen(PORT); will not work here, as it creates a new HTTP server
