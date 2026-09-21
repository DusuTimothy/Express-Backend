const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. Admin access only."
      });
    }

    next();
  };
};

module.exports = { authorize };
