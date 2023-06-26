const router = require("express").Router();
const User = require("../Models/User.js");
const UserVerification = require("../Models/UserVerification.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// let testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//REsgister
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const ALreadyuser = await User.findOne({
      email: req.body.email,
    });
    if (ALreadyuser) {
      res.status(404).json({ message: "User already exits." });
      return;
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePic: req.body.profilePic,
    });
    const user = await newUser.save().then((result) => {
      console.log(result);
      sendOTPVerificationEmail(result, res);
    });
    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(400).json("No user");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(400).json("Wrong Crendentials");
      return;
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//verify email
router.post("/verifyOTP", async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details.");
    } else {
      const UserOTPVerificationRecords = await UserVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        throw new Error("Account doesn't exits or has not been verified.");
      } else {
        const { expiredAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiredAt < Date.now()) {
          await UserVerification.deleteMany({ userId });
          throw new Error("OTP has expired.");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            throw new Error("Invalid OTP.");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserVerification.deleteMany({ userId });
            res.status(200).json({ message: "User email has verified" });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//resend OTP
router.post("/resendOTP", async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty details.");
    } else {
      await UserVerification.deleteMany({ userId });
      sendOTPVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  console.log(_id, email);
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> to verify your email address and complete the sign up process.The OTP will expire in 1 hour</p>`,
    };

    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otp, salt);

    const newOTPVerification = await new UserVerification({
      userId: _id,
      otp: hashOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      status: "Pending",
      message: "Verification OTP send to the email",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
