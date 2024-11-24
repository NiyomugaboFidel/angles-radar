import Joi from 'joi';

const createUserSchema = Joi.object({
  firstName: Joi.string().min(3).optional(),
  lastName: Joi.string().min(3).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co"] },
    })
    .optional()
    .label("Email"),

  password: Joi.string().min(6).max(12).pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).optional(),
}).min(1);

const createUserValidation = async (req, res, next) => {
  const { error } = createUserSchema.validate(req.body, {
    abortEarly: false,
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

export default createUserValidation;
