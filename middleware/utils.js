const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

exports.createTransporterSMTP = () => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000,
  handler: (req, res, next) => {
    const error = new Error(
      "Too many requests from this IP, please try again later."
    );
    error.status = 429;
    next(error);
  },
});
