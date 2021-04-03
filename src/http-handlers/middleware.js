module.exports = (req, res, next) => {
  console.info('middleware http - %s %s from IP %s', req.method, req.originalUrl, req.connection.remoteAddress);
  next();
}
