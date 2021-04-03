module.exports = (socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   socket.username = username;
  console.log('middleware ws   - %s ID: %s', socket.handshake.url, socket.id)
  next();
}
