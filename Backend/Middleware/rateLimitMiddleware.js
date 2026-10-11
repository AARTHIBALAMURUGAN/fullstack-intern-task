const rateLimit = require("express-rate-limit");



const favoriteLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many favorite requests. Please try again later.",
  },
});

module.exports = {
  favoriteLimiter,
};