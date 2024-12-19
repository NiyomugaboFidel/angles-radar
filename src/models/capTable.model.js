import mongoose from "mongoose";
const capTableSchema = new mongoose.Schema(
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
      shareholder: { type: String, required: true },
      sharesOwned: { type: Number, required: true , default:20 }, 
      equityPercentage: { type: String , required:true, default:"20%" }, 
    },
    { timestamps: true }
  );
  
  export const CapTable = mongoose.model("CapTable", capTableSchema);
  