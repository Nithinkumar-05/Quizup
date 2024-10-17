const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY || "mysecretkey";

class LoginController {
  async login(req, res) {
    console.log(req.body);

    const { userId, password } = req.body;
    try {
      const user = await userModel.findOne({ userId: userId });
      if (!user) {
        return res.status(400).json({ message: "Invalid User ID" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
      const token = jwt.sign({ emailId: user.emailId }, secretKey, {
        expiresIn: "24h",
      });
      return res
        .status(200)
        .json({ role: user.role, token: token, user: user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async register(req, res) {
    const { fullName, phoneNumber, emailId, password, role, userId } = req.body;
    try {
      const user = await userModel.findOne({ userId: userId });
      if (user) {
        return res.status(400).json({ message: "UserID already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        fullName,
        phoneNumber,
        emailId,
        password: hashedPassword,
        role,
        userId,
      });
      await newUser.save();
      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new LoginController();
