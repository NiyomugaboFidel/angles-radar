import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "co"] } })
    .required()
    .label("Email"),
  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .label("Password"),
});

export const loginValidation = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body, {
    abortEarly: false, // Gather all errors instead of stopping at the first one.
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) =>
        err.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  }

  next();
};

export default loginValidation;