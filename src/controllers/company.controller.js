import { Company } from "../models/company.model.js";
import { TeamMember } from "../models/teamMember.model.js";
import  User  from "../models/user.model.js"; 
import { CompanyProfile } from "../models/companyProfile.model.js";
import {CapTable} from '../models/capTable.model.js'

const CompanyController = {

  async createCompany(req, res) {
    try {
      const { companyName, jobTitle, interestedTags } = req.body;
      const userId = req.user?.id;

      if (!companyName || !jobTitle || !userId) {
        return res.status(400).json({
          message: "companyName, jobTitle, and authenticated userId are required.",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      console.log(companyName);
       const existCompany = await Company.findOne({companyName});
       if(existCompany){
        return res.status(404).json({ message: "Company with this name already exists." });
       } 
  
      const newCompany = new Company({
        companyName: companyName,
        interestedTags: interestedTags || [],
        userId,
      });

      await newCompany.save();

      const teamMember = new TeamMember({
        companyId: newCompany._id,
        name: user.firstName || user.lastName,
        role: jobTitle || "Founder",
        imageUrl: user.profilePic || "",
      });
      const newShareholder = new CapTable({
        companyId: newCompany._id,
        shareholder: user.firstName || user.lastName,
      });

     await Promise.all([teamMember.save(), newShareholder.save()])

      return res.status(201).json({
        message: "Company and team member created successfully!",
        company: newCompany,
        teamMember,
        shareholder:newShareholder
      });
    } catch (error) {
      console.error("Error creating company:", error.message);
      res.status(500).json({ message: "Server error. Failed to create company." });
    }
  },


  async getAllCompanies(req, res) {
    try {
      const companies = await Company.find().populate("userId", "name email");
      res.status(200).json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error.message);
      res.status(500).json({ message: "Failed to retrieve companies." });
    }
  },


  async getCompanyById(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findById(id).populate("userId", "name email");
      if (!company) {
        return res.status(404).json({ message: "Company not found." });
      }
      res.status(200).json(company);
    } catch (error) {
      console.error("Error fetching company:", error.message);
      res.status(500).json({ message: "Failed to retrieve company." });
    }
  },

 
  async updateCompany(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const company = await Company.findByIdAndUpdate(id, updates, { new: true });
      if (!company) {
        return res.status(404).json({ message: "Company not found." });
      }
      res.status(200).json({ message: "Company updated successfully!", company });
    } catch (error) {
      console.error("Error updating company:", error.message);
      res.status(500).json({ message: "Failed to update company." });
    }
  },


  async deleteCompany(req, res) {
    try {
      const { id } = req.params;

      const company = await Company.findByIdAndDelete(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found." });
      }

      await TeamMember.deleteMany({ companyId: id }); 
      await CompanyProfile.deleteMany({ companyId: id }); 

      res.status(200).json({ message: "Company and associated team members deleted successfully!" });
    } catch (error) {
      console.error("Error deleting company:", error.message);
      res.status(500).json({ message: "Failed to delete company." });
    }
  },
};

export default CompanyController;
