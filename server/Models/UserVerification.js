const mongoose = require("mongoose");

const UserVerificationSchema = mongoose.Schema({
  userId: { type: String },
  otp: { type: String },
  createdAt: { type: Date },
  expiredAt: { type: Date },
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);
