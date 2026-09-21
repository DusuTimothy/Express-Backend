const { z } = require("zod");

const loginChecker = z.object({
  email: z.email({ error: "invalid email" }),
  password: z.string().trim().min(6, "Password must be at least 6 characters")
});

module.exports = {
  loginChecker
};
