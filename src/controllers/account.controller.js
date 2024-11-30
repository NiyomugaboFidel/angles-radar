import Account from '../models/account.model.js'

export const createAccount = async (req, res) => {
    try {
      const { userId, interestedTags, companyType, investmentsType, companyStage, ticketSize, companyName, jobTitle } = req.body;
  
      const newAccount = new Account({
        userId,
        interestedTags,
        companyType,
        investmentsType,
        companyStage,
        ticketSize,
        companyName,
        jobTitle,
      });
  
      const savedAccount = await newAccount.save();
      res.status(201).json({ message: "Account created successfully", data: savedAccount });
    } catch (error) {
      res.status(400).json({ message: "Error creating account", error: error.message });
    }
  };
  

  export const getAccounts = async (req, res) => {
    try {
      const accounts = await Account.find().populate("userId", "firstName lastName email role"); // Populate user info
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving accounts", error: error.message });
    }
  };
  export const getAccountById = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id).populate("userId", "username email");
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving account", error: error.message });
    }
  };
  export const updateAccount = async (req, res) => {
    try {
      const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Validate schema during update
      });
      if (!updatedAccount) {
        return res.status(404).json({ message: "Account not found" });
      }
      res.status(200).json({ message: "Account updated successfully", data: updatedAccount });
    } catch (error) {
      res.status(400).json({ message: "Error updating account", error: error.message });
    }
  };
  export const deleteAccount = async (req, res) => {
    try {
      const deletedAccount = await Account.findByIdAndDelete(req.params.id);
      if (!deletedAccount) {
        return res.status(404).json({ message: "Account not found" });
      }
      res.status(200).json({ message: "Account deleted successfully", data: deletedAccount });
    } catch (error) {
      res.status(500).json({ message: "Error deleting account", error: error.message });
    }
  };
        