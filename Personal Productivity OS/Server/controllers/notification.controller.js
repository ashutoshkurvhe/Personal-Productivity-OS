const webpush = require("web-push");
const nodemailer = require("nodemailer");

// Send web push
exports.sendWebPushNotification = async (req, res) => {
  const { subscription, title, body } = req.body;
  await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
  res.json({ message: "Web push sent" });
};

// Send email reminder
exports.sendEmailReminder = async (req, res) => {
  const { to, subject, text } = req.body;
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
};