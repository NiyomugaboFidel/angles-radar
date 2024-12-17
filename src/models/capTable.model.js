const capTableSchema = new mongoose.Schema(
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
      shareholder: { type: String, required: true }, // Name of shareholder
      sharesOwned: { type: Number, required: true }, // Number of shares
      equityPercentage: { type: String }, // Percentage in equity
    },
    { timestamps: true }
  );
  
  export const CapTable = mongoose.model("CapTable", capTableSchema);
  