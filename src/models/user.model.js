import mongoose from "mongoose";

var userSchema = new mongoose.Schema(
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
      unique: true,
      minlength: 10,
      maxlength: 15,
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
      default: "https://res.cloudinary.com/dmosnjgob/image/upload/v1732370311/pngegg_zilpcj.png", 
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);
export default User;
