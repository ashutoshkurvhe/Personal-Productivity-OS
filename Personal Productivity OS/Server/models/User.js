const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "light",
    },
    settings: {
      pomodoro: {
        workDuration: { type: Number, default: 25 }, // in minutes
        shortBreak: { type: Number, default: 5 },
        longBreak: { type: Number, default: 15 },
      },
      notifications: {
        emailReminders: { type: Boolean, default: true },
        webPush: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

//Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
