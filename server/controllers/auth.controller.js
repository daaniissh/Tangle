import { generateTokenAndSetCookies } from "../lib/utils/tokens.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username is already taken" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email is already taken" });
  }
  if (password?.length < 6) {
    res
      .status(401)
      .json({ error: "Password must be at least 6 characters long" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fullName,
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    generateTokenAndSetCookies(newUser._id, res);
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
      bio: newUser.bio,
      link: newUser.link,
      followers: newUser.followers,
      following: newUser.following,
    });
  } else {
    console.log("Internal server error at signup : line 54");
    res
      .status(400)
      .json({ error: "Internal server error at signup : line 54" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookies(user._id, res);
    const {
      _id,
      fullName,
      email,
      profileIMg,
      coverImg,
      bio,
      link,
      followers,
      following,
    } = user;
    res.status(200).json({
      _id,
      username: user.username,
      fullName,
      email,
      profileIMg,
      coverImg,
      bio,
      link,
      followers,
      following,
    });
  } catch (error) {
    console.log("Internal server error at Login : line 68");
    res.status(400).json({ error: "Internal server error at Login : line 68" });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/", // Ensure the path matches the one used when setting the cookie
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Internal server error at Logout : line 111");
    res
      .status(400)
      .json({ error: "Internal server error at Logout : line 111" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    
    const now = new Date();

    const userPosts = await Post.find({ user: userId, is_story: true });

    const activeStoryExists = userPosts.some(post => post.expiresAt > now);
    
    if (!activeStoryExists) {

      await User.findByIdAndUpdate(userId, { $set: { is_story: false } });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

export const forgotPassword = async (req, res) => {
  const year = new Date().getFullYear();
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const otp = generateOTP();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #007bff;
            color: #fff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your OTP Code</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Here is your One-Time Password (OTP) for verification:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; ${year} Tangle. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    });

    req.session.otp = otp;
    req.session.email = email;

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

export const otpVerification = async (req, res) => {
  try {
    const { otpNumber } = req.body;
    const storedOtp = req.session.otp;
    if (!otpNumber) {
      return res.status(400).json({ error: "OTP is required." });
    }

    if (otpNumber != storedOtp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }
    req.session.otpVerified = true;
    return res.status(200).json({ message: "OTP successfully verified." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const email = req.session.email;
  const otp = req.session.otp;
  const otpVerified = req.session.otpVerified;
  if (!otpVerified)
    return res.status(400).json({
      error: "OTP verification required before resetting password.",
    });
  try {
    let user = await User.findOne({ email });
    // console.log(user);
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match. Please re-enter both fields.",
      });
    }
    if (password && confirmPassword) {
      console.log(otp);
      if (!otp)
        return res
          .status(400)
          .json({ error: "Something wrong,please verify your email" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ error: "Password must be at least 6 character long" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to clear session", error: err.message });
        }
        res
          .status(200)
          .json({ message: "Password reset successful. Session cleared." });
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
