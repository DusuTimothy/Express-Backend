const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product");
const authenticate = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");
const { validate } = require("../middleware/validate");
const {
  createProductChecker,
  updateProductChecker
} = require("../validators/productCheck");

router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProducts);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createProductChecker),
  createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateProductChecker),
  updateProduct
);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

module.exports = router;
