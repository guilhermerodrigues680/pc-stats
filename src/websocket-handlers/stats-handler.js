const { Server, Socket } = require("socket.io");

/**
 * @param {Server} io
 * @param {Socket} socket
 */
module.exports = (io, socket) => {

  const simpleMsg = (msg) => {
    console.log('simple-msg', msg, io);
  }

  const debugAny = (eventName, ...args) => {
    console.log('debugAny:', eventName, args);
  }

  const disconnect = () => {
    console.log('disconnected - %s', socket.id);
  }

  socket.onAny(debugAny);
  socket.on("simple-msg", simpleMsg);
  socket.on('disconnect', disconnect)
}
