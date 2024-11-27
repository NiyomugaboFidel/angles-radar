import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendEmailVerify from "../services/sendOTPEmailVerify.js";
import verifyToken from "../utils/verifyToken.js";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and generate OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + (10 * 60 * 1000); // 10 minutes from now
  

    // Create new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpires
    });

    const token = createToken(newUser);
    await Promise.all([
      newUser.save(), 
      sendEmailVerify(email, firstName, otp) 
    ]);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser , token});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


const verifyEmial = async (req, res) => {
  const { otp, token } = req.body;  


  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
 
    const {email, id} = verifyToken(token);
 

   
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isActive = true;
    user.isEmailVerified = true
    user.otp = null;  
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic:user.profilePic
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editUserProfile = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    mobile,
    role,
    dateOfBirth,
    nationality,
    userAddress,
    gender,
    profilePic,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        mobile,
        role,
        dateOfBirth,
        nationality,
        userAddress,
        gender,
        profilePic,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const chooseRole = async (req, res) => {
  const { role } = req.body;
  const userId = req.user.id;

  try {
    if (!["owner", "investor"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const userId = id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  createUser,
  verifyEmial,
  loginUser,
  editUserProfile,
  chooseRole,
  getUser,
  getAllUsers,
};
