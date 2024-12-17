import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyType: { type: String }, // e.g., Technology, Finance
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
