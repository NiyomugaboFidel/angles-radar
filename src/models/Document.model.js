const documentSchema = new mongoose.Schema(
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
      name: { type: String, required: true },
      type: { type: String, required: true }, 
      url: { type: String, required: true }, 
    },
    { timestamps: true }
  );
  
  export const Document = mongoose.model("Document", documentSchema);
  