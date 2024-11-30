import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    interestedTags: {
      type: [String], // Array of strings
      required: true,
      default: [],
    },
    companyType: {
      type: String,
    },
    investmentsType: {
      type: String,
    },
    companyStage: {
      type: String,
    },
    ticketSize: {
      type: Number, // Use `Number` for numbers
    },
    companyName: {
      type: String,
    },
    jobTitle: {
      type: String, // Use `String` for strings
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
