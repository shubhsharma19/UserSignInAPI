// validationSchemas.js
const { z } = require("zod");

const loginInputSchema = z.object({
  body: z.object({
    username: z.string().min(8),
    email: z.string().endsWith("@gmail.com") || z.string().endsWith(".com"),
    password: z.string().min(8),
  }),
});

// middleware for input validation
const validateUserInput = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body });
    next();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
}

module.exports = {
  validateUserInput,
};