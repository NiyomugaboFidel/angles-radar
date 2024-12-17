import mongoose from "mongoose";
const companyProfileSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    investmentsType: { type: String, default: "Equity" },
    companyStage: { type: String, default: "Pre-Revenue" },
    ticketSize: { type: Number },
    interestedTags: { type: [String], default: [] },
    logo: { type: String, required: true },
    tagline: { type: String, required: true }, 
    description: { type: String, required: true }, 
    background: { type: String }, 

    fundRaiseDetails: {
      raiseGoal: { type: Number, default: 0 },
      amountRaised: { type: Number, default: 0 },
      round: { type: String, default: "Pre-seed" },
      stage: { type: String, default: "Pre-Revenue" },
    },
    metrics: {
      valuation: { type: String },
      evaluationScore: { type: String },
      mrr: { type: String },
      growthRate: { type: String },
      foundedDate: { type: String },
      angelOffering: { type: String },
    },
  },
  { timestamps: true }
);

export const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
