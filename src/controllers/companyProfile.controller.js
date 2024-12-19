import { CapTable } from "../models/capTable.model.js";
import { CompanyProfile } from "../models/companyProfile.model.js";
import { TeamMember } from "../models/teamMember.model.js";

const CompanyProfileController = {
  // 1. Create a new company profile
  async createCompanyProfile(req, res) {
    try {
      const userId = req.user.id;
      const {
        companyId,
        investmentsType,
        companyStage,
        ticketSize,
        interestedTags,
        tagline,
        description,
        fundRaiseDetails,
        metrics,
      } = req.body;

      // Ensure required fields are present
      if (!companyId || !userId || !tagline || !description) {
        return res
          .status(400)
          .json({ message: "CompanyId, userId, tagline, and description are required." });
      }

      // Access uploaded files
      const logo = req.files?.logo?.[0]?.path || null; // Cloudinary returns the file URL in the `path`
      const background = req.files?.background?.[0]?.path || null;

      if (!logo || !background) {
        return res
          .status(400)
          .json({ message: "Logo and background images are required." });
      }

      // Create new company profile
      const newCompanyProfile = new CompanyProfile({
        companyId,
        userId,
        investmentsType,
        companyStage,
        ticketSize,
        interestedTags,
        logo, // Cloudinary URL
        tagline,
        description,
        background, // Cloudinary URL
        fundRaiseDetails,
        metrics,
      });

      await newCompanyProfile.save();

      return res.status(201).json({
        message: "Company profile created successfully!",
        companyProfile: newCompanyProfile,
      });
    } catch (error) {
      console.error("Error creating company profile:", error.message);
      res.status(500).json({ message: "Server error. Failed to create company profile." });
    }
  },

  // 2. Get all company profiles
  async getAllCompanyProfiles(req, res) {
    try {
      const companyProfiles = await CompanyProfile.find().populate("companyId userId");
      return res.status(200).json({
        message: "Company profiles retrieved successfully.",
        data: companyProfiles,
      });
    } catch (error) {
      console.error("Error fetching company profiles:", error.message);
      res.status(500).json({ message: "Server error. Failed to fetch company profiles." });
    }
  },


  async getFilteredCompanyProfiles(req, res) {
    try {
      const {
        companyStage,
        investmentType,
        valuationRange,
        growthRateRange,
        mrrRange,
        fundingRequiredRange,
        tags,
      } = req.query;
 
      const filterQuery = {};
  
      // Company Stage filter
      if (companyStage) {
        filterQuery.companyStage = companyStage;
      }
  
      // Investment Type filter
      if (investmentType) {
        filterQuery.investmentsType = investmentType;
      }
  
      // Valuation Range filter
      if (valuationRange) {
        const [min, max] = valuationRange.split('-').map(Number);
        filterQuery['metrics.valuation'] = {
          $gte: min,
          $lte: max
        };
      }
  
      // Growth Rate filter
      if (growthRateRange) {
        const [min, max] = growthRateRange.split('-').map(Number);
        filterQuery['metrics.growthRate'] = {
          $gte: min,
          $lte: max
        };
      }
  
      // MRR Range filter
      if (mrrRange) {
        const [min, max] = mrrRange.split('-').map(Number);
        filterQuery['metrics.mrr'] = {
          $gte: min,
          $lte: max
        };
      }
  
      // Funding Required Range filter
      if (fundingRequiredRange) {
        const [min, max] = fundingRequiredRange.split('-').map(Number);
        filterQuery['metrics.fundingRequired'] = {
          $gte: min,
          $lte: max
        };
      }
  
      // Tags filter
      if (tags) {
        filterQuery.interestedTags = {
          $in: tags.split(',')
        };
      }
  
      const companies = await CompanyProfile.find(filterQuery)
        .populate('companyId')
        .populate('userId')
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching filtered company profiles',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }},
  

  // 3. Get a single company profile by ID
  async getCompanyProfileById(req, res) {
    try {
      const { id } = req.params;

      const companyProfile = await CompanyProfile.findById(id).populate("companyId userId");

      if (!companyProfile) {
        return res.status(404).json({ message: "Company profile not found." });
      }
      const teamMember = await TeamMember.findOne({companyId:companyProfile.companyId})
      const shareholder = await CapTable.findOne({companyId:companyProfile.companyId})

      return res.status(200).json({
         data:{
          company:companyProfile,
          teamMember,
          shareholder,
         }
      });
    } catch (error) {
      console.error("Error fetching company profile:", error.message);
      res.status(500).json({ message: "Server error. Failed to fetch company profile." });
    }
  },

  // 4. Update a company profile
  async updateCompanyProfile(req, res) {
    try {
      const { id } = req.params;

      const updatedProfile = await CompanyProfile.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true, 
      });

      if (!updatedProfile) {
        return res.status(404).json({ message: "Company profile not found." });
      }

      return res.status(200).json({
        message: "Company profile updated successfully.",
        data: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating company profile:", error.message);
      res.status(500).json({ message: "Server error. Failed to update company profile." });
    }
  },

  // 5. Delete a company profile
  async deleteCompanyProfile(req, res) {
    try {
      const { id } = req.params;

      const deletedProfile = await CompanyProfile.findByIdAndDelete(id);

      if (!deletedProfile) {
        return res.status(404).json({ message: "Company profile not found." });
      }

      return res.status(200).json({
        message: "Company profile deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting company profile:", error.message);
      res.status(500).json({ message: "Server error. Failed to delete company profile." });
    }
  },
};

export default CompanyProfileController;
