const teamMemberSchema = new mongoose.Schema(
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
      name: { type: String, required: true },
      role: { type: String, default: "CEO" }, 
      imageUrl: { type: String }, 
    },
    { timestamps: true }
  );
  
  export const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
  