const { z } = require("zod");

const registerChecker = z.object({
  name: z.string().trim().min(4, "Name must be at least 4 characters long"),
  email: z.email({ error: "invalid email" }),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  role: z.enum(["admin", "user"], {
    error: "Role must be either admin or user"
  })
});

module.exports = {
  registerChecker
};
