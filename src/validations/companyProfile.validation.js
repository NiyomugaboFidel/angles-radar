const companyValidationSchema = Joi.object({
  userId: Joi.string().required(),
  interestedTags: Joi.array().items(Joi.string()).required(),
  companyType: Joi.string(),
  investmentsType: Joi.string(),
  companyStage: Joi.string(),
  ticketSize: Joi.number(),
  companyName: Joi.string(),
  jobTitle: Joi.string(),
});

const companyProfileValidation = (req, res, next) => {
  const { error } = companyValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export default companyProfileValidation;
