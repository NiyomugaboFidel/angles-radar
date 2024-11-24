import Joi from "joi";

const userProfileSchema = Joi.object({
  firstName: Joi.string().min(3).optional(),
  lastName: Joi.string().min(3).optional(),
  gender: Joi.string().valid("male", "female").optional(),
  dateOfBirth: Joi.date().less("1-1-2100").optional().label("Date of Birth"),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "co"] } })
    .optional()
    .label("Email"),
  mobile: Joi.string()
    .min(10)
    .max(20)
    .pattern(/^[0-9]+$/)
    .optional()
    .label("Phone Number"),
  nationality: Joi.string().max(50).optional().label("Nationality"),
  userAddress: Joi.array()
    .items(
      Joi.object({
        street: Joi.string().max(100).optional(),
        city: Joi.string().max(50).optional(),
        postalCode: Joi.string().max(10).optional(),
        country: Joi.string().max(50).optional(),
      })
    )
    .optional(),

}).min(1); 
export const editUserProfileValidation = async (req, res, next) => {
  const { error } = userProfileSchema.validate(req.body, {
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

export default editUserProfileValidation