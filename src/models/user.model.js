import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 15,
      default: null, // Allows null values
    },
    role: {
      type: String,
      enum: ["owner", "investor"],
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    userAddress: [
      {
        street: String,
        city: String,
        postalCode: String,
        country: String,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dmosnjgob/image/upload/v1732370311/pngegg_zilpcj.png",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    otp: {
      type: Number,
    },
    otpExpires: {
      type: Date,
    },
    
    socialMedia: {
      linkedIn: {
        type: String,
        match: [
          /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
          "Please provide a valid LinkedIn URL",
        ],
        default: null,
      },
      instagram: {
        type: String,
        match: [
          /^(https?:\/\/)?(www\.)?instagram\.com\/.*$/,
          "Please provide a valid Instagram URL",
        ],
        default: null,
      },
      facebook: {
        type: String,
        match: [
          /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
          "Please provide a valid Facebook URL",
        ],
        default: null,
      },
      github: {
        type: String,
        match: [
          /^(https?:\/\/)?(www\.)?github\.com\/.*$/,
          "Please provide a valid GitHub URL",
        ],
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);


userSchema.index({ mobile: 1 }, { unique: false });

const User = mongoose.model("User", userSchema);
export default User;
