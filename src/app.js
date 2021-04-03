const path = require('path');
const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {});

// HTTP
const httpMiddleware = require('./http-handlers/middleware');
const apiRootRoute = require('./http-handlers/api-root');
const statsRoute = require('./http-handlers/stats-route');

// Websocket
const websocketMiddleware = require('./websocket-handlers/middleware');
const registerStatsHandlers = require("./websocket-handlers/stats-handler");
const websocketBroadcast = require("./websocket-handlers/broadcast");

// Expresss
app.use(httpMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', apiRootRoute);
app.use('/api/', statsRoute);

// Socket.io
io.use(websocketMiddleware);
io.on("connection", (socket) => {
  registerStatsHandlers(io, socket);
});
websocketBroadcast(io);

module.exports = httpServer;
// WARNING !!! app.listen(PORT); will not work here, as it creates a new HTTP server
