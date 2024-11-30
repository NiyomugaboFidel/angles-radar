
// Define the validation schema
const accountValidationSchema = Joi.object({
  userId: Joi.string().required(),
  interestedTags: Joi.array()
    .items(Joi.string())
    .required()
   ,
  companyType: Joi.string(),
  investmentsType: Joi.string(),
  companyStage: Joi.string(),
  ticketSize: Joi.number(),
  companyName: Joi.string(),
  jobTitle: Joi.string(),
});

// Middleware for validation
 const accountProfileValidation = (req, res, next) => {
  const { error } = accountValidationSchema.validate(req.body, {
    abortEarly: false, // Gather all errors
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message), // Return user-friendly error messages
    });
  }

  next();
};

export default accountProfileValidation;
