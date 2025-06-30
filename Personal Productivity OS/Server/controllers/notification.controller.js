const webpush = require("web-push");
const nodemailer = require("nodemailer");

// Send web push notification
exports.sendWebPushNotification = async (req, res) => {
  try {
    const { subscription, title, body } = req.body;

    if (!subscription || !title || !body) {
      return res
        .status(400)
        .json({ message: "Subscription, title, and body are required" });
    }

    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title, body })
    );
    res.json({ message: "Web push sent" });
  } catch (error) {
    console.error("Web Push Error:", error.message);
    res.status(500).json({ message: "Failed to send web push notification" });
  }
};

// Send email reminder
exports.sendEmailReminder = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res
        .status(400)
        .json({ message: "To, subject, and text are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.json({ message: "Email sent" });
  } catch (error) {
    console.error("Email Send Error:", error.message);
    res.status(500).json({ message: "Failed to send email reminder" });
  }
};
