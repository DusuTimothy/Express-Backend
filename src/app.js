const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const userRoutes = require("./routes/user.route");
const roleRoutes = require("./routes/role.route");
const productRoutes = require("./routes/product.route");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(globalLimiter);
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome, API is running"
  });
});

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/roles", roleRoutes);

app.use(errorHandler);

module.exports = app;
