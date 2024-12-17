import InvestorProfile from "../models/investor.model.js"; // Adjust the path to your model

// ==========================
// CREATE a new investor profile
// ==========================
export const createInvestorProfile = async (req, res) => {
  try {
    const {
      interestedTags,
      companyType,
      investmentsType,
      companyStage,
      ticketSize,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !ticketSize) {
      return res
        .status(400)
        .json({ message: "userId and ticketSize are required." });
    }

    const newInvestorProfile = new InvestorProfile({
      userId,
      interestedTags: interestedTags.map(tag => tag.toLowerCase()), 
      companyType: companyType.toLowerCase(),
      investmentsType: investmentsType.toLowerCase(),
      companyStage: companyStage.toLowerCase(),
      ticketSize,
    });

    await newInvestorProfile.save();

    res.status(201).json({
      message: "Investor profile created successfully.",
      investorProfile: newInvestorProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating investor profile.",
        error: error.message,
      });
  }
};

// ==========================
// GET all investor profiles
// ==========================
export const getAllInvestorProfiles = async (req, res) => {
  try {
    const investorProfiles = await InvestorProfile.find().populate(
      "userId",
      "firstName lastName email"
    ); // Populate user info
    res.status(200).json(investorProfiles);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching investor profiles.",
        error: error.message,
      });
  }
};

// ==========================
// GET an investor profile by ID
// ==========================
export const getInvestorProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const investorProfile = await InvestorProfile.findById(id).populate(
      "userId",
      "firstName lastName email mobile socialMedia"
    );
    if (!investorProfile) {
      return res.status(404).json({ message: "Investor profile not found." });
    }

    res.status(200).json(investorProfile);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching investor profile.",
        error: error.message,
      });
  }
};

// ==========================
// UPDATE an investor profile
// ==========================
export const updateInvestorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProfile = await InvestorProfile.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Investor profile not found." });
    }

    res.status(200).json({
      message: "Investor profile updated successfully.",
      investorProfile: updatedProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating investor profile.",
        error: error.message,
      });
  }
};

// ==========================
// DELETE an investor profile
// ==========================
export const deleteInvestorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await InvestorProfile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: "Investor profile not found." });
    }

    res.status(200).json({ message: "Investor profile deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting investor profile.",
        error: error.message,
      });
  }
};

// ==========================
// GET investor profiles with filters
// ==========================
export const getInvestorProfilesByFilter = async (req, res) => {
  try {
    const {
      companyType,
      investmentsType,
      companyStage,
      minTicketSize,
      maxTicketSize,
    } = req.query;

    const filter = {};

    // Add dynamic filters
    if (companyType) filter.companyType = companyType.toLowerCase();
    if (investmentsType) filter.investmentsType = investmentsType.toLowerCase();
    if (companyStage) filter.companyStage = companyStage.toLowerCase();
    if (minTicketSize || maxTicketSize) {
      filter.ticketSize = {};
      if (minTicketSize) filter.ticketSize.$gte = Number(minTicketSize);
      if (maxTicketSize) filter.ticketSize.$lte = Number(maxTicketSize);
    }

    const filteredProfiles = await InvestorProfile.find(filter);

    res.status(200).json(filteredProfiles);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching filtered investor profiles.",
        error: error.message,
      });
  }
};
