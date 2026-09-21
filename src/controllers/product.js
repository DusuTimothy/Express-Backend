const { Products } = require("../database");

const getProducts = (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      products: Products
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = Products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }

    return res.status(200).json({
      status: "success",
      product
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = {
      id: Products.length > 0 ? Math.max(...Products.map((p) => p.id)) + 1 : 1,
      name,
      description,
      price
    };

    Products.push(newProduct);

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = Products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }

    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.description !== undefined) product.description = req.body.description;
    if (req.body.price !== undefined) product.price = req.body.price;

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = Products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }

    const deleted = Products.splice(index, 1)[0];

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      product: deleted
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
