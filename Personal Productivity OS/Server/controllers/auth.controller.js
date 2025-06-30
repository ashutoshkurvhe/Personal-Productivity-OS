const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//SignUp User
exports.registerUser = async (req, res) => {
    const { fullName, email, password} = req.body;

    //validate Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        //Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        //Create the user
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
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


//Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mesaage: "All field are required" });
    }

    try {
        //Check if user exists
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};



//Getting User Info
exports.getUserInfo = async (req, res) => {
    try {
        //Find the user by Id
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.fullName;
    user.email = req.body.email || user.email;
    user.profileImageUrl = req.body.profileImmageUrl || user.profileImageUrl;
    if (req.body.password) user.password = req.body.password; //will be hased by pre-save hook
    
    const updated = await user.save();
    res.json(updated);
};


exports.updateTheme = async (req, res) => {
  const { theme } = req.body;
  const user = await User.findById(req.user._id);
  user.theme = theme;
  await user.save();
  res.json({ theme: user.theme });
};

exports.updateSettings = async (req, res) => {
  const { pomodoro, notifications } = req.body;
  const user = await User.findById(req.user._id);
  if (pomodoro) user.settings.pomodoro = pomodoro;
  if (notifications) user.settings.notifications = notifications;
  await user.save();
  res.json(user.settings);
};
