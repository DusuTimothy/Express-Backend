const { z } = require("zod");

const createProductChecker = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z.number().positive("Price must be a positive number")
});

const updateProductChecker = z.object({
  name: z.string().trim().min(1, "Product name is required").optional(),
  description: z.string().trim().min(1, "Product description is required").optional(),
  price: z.number().positive("Price must be a positive number").optional()
}).refine(
  (data) => data.name !== undefined || data.description !== undefined || data.price !== undefined,
  { message: "At least one field (name, description, or price) must be provided" }
);

module.exports = {
  createProductChecker,
  updateProductChecker
};
