const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "40h" });
};

// Register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl = null } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register User Error:", error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login User Error:", error.message);
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

// Get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Get User Info Error:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching user info", error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;
    if (req.body.password) user.password = req.body.password; // Will be hashed by pre-save hook

    const updated = await user.save();
    res.json(updated);
  } catch (error) {
    console.error("Update User Profile Error:", error.message);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

// Update theme
exports.updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.theme = theme;
    await user.save();
    res.json({ theme: user.theme });
  } catch (error) {
    console.error("Update Theme Error:", error.message);
    res
      .status(500)
      .json({ message: "Error updating theme", error: error.message });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const { pomodoro, notifications } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (pomodoro) user.settings.pomodoro = pomodoro;
    if (notifications) user.settings.notifications = notifications;
    await user.save();

    res.json(user.settings);
  } catch (error) {
    console.error("Update Settings Error:", error.message);
    res
      .status(500)
      .json({ message: "Error updating settings", error: error.message });
  }
};
