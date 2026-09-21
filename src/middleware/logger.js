const logger = (req, res, next) => {
  res.on("finish", () => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${time}`);
  });

  next();
};

module.exports = logger;
