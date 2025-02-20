const UserModal = require('../Modals/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require("../mailer")
const nodemailer = require('nodemailer');
require('dotenv').config();



const signup = async (req, res) => {

  try {
    const { name, email, password, userType } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: "User already exists, please login", success: false });
    }
    const newUser = new UserModal({ name, email, password, userType });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await sendVerificationEmail(email, token);
    res.status(201)
      .json({
        message: "Signup Successfull",
        success: true
      })

  } catch (error) {
    res.status(500)
      .json({
        message: "internal server error",
        success: false
      })
  }
}






const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    const errormsg = "Incorrect email or password";
    if (!user) {
      return res.status(403)
        .json({ message: errormsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403)
        .json({ message: errormsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.status(200)
      .json({
        message: "Login Successful Successfull",
        success: true,
        jwtToken,
        email,
        name: user.name,
        userType: user.userType
      })

  } catch (error) {
    res.status(500)
      .json({
        message: "internal server error",
        success: false
      })
  }
}




const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h", })
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="${process.env.FRONTEND_URL}/resetPassword/${token}">${process.env.FRONTEND_URL}/resetPassword/${token}</a>
    <p>The link will expire in 1 hour.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email Sent" });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}






const resetPassword = async (req, res) => {
  try {
    const decodedToken = await jwt.verify(req.params.token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid toke" });

    }
    const user = await UserModal.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
const verify = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Received Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    let user = await UserModal.findOne({ email: decoded.email });
    console.log("User Found:", user);

    if (!user) {
      console.log("User not found in DB");
      // return res.redirect(`${process.env.FRONTEND_URL}/login?verified=false`);
    res.status(400).send({ message: "failed" });

    }

    // if (user.verified) {
    //   console.log("User already verified");
    //   return res.redirect(`${process.env.FRONTEND_URL}/login?verified=already`);
    // }

    user.verified = true;
    await user.save();
    console.log("User verified successfully");

    // return res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`)
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.error("Verification Error:", error);
    // return res.redirect(`${process.env.FRONTEND_URL}/login?verified=false`);
    res.status(400).send({ message: "failed" });
  }
}


module.exports = {
  signup,
  login,
  forgetPassword,
  resetPassword,
  verify,
};