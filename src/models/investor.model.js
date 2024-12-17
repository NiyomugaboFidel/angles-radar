import mongoose from "mongoose";

const investorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    interestedTags: { type: [String], default: [] },
    companyType: { type: String, default: "Startup" }, 
    investmentsType: { type: String, default: "Equity" }, 
    companyStage: { type: String, default: "Idea" },
    ticketSize: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const InvestorProfile = mongoose.model("InvestorProfile", investorProfileSchema);
export default  InvestorProfile