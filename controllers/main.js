require("dotenv").config();

const { validationResult } = require("express-validator");
const { createTransporterSMTP } = require("../middleware/utils");

exports.getIndex = (req, res, next) => {
  res.render("index", {
    coverTopic: req.i18n_texts.main,
    leftBlock: true,
    rightBlock: true,
    buttonCover: true,
    discount: true,
    coverImage: "img/cover.jpg",
    sectionTitleContact: true,
    portfolio: true,
  });
};

exports.getHoreca = (req, res, next) => {
  res.render("horeca", {
    coverTopic: req.i18n_texts.horecaTopic,
    leftBlock: false,
    rightBlock: false,
    buttonCover: true,
    discount: false,
    coverImage: "img/horeca.png",
    isMehr: false,
    sectionTitleContact: true,
    portfolio: true,
  });
};

exports.getKleideranfertigung = (req, res, next) => {
  res.render("kleideranfertigung", {
    coverTopic: req.i18n_texts.kleiderTopic,
    leftBlock: true,
    rightBlock: true,
    buttonCover: true,
    discount: true,
    coverImage: "img/kleideranfertigung.png",
    isMehr: true,
    sectionTitleContact: true,
    portfolio: true,
  });
};

exports.getHeimtextilien = (req, res, next) => {
  res.render("heimtextilien", {
    coverTopic: req.i18n_texts.heimTopic,
    leftBlock: true,
    rightBlock: true,
    buttonCover: true,
    discount: true,
    coverImage: "img/heimtextilien.png",
    isMehr: true,
    sectionTitleContact: true,
    portfolio: true,
  });
};

exports.getMyself = (req, res, next) => {
  res.render("myself", {
    coverTopic: req.i18n_texts.aboutTopic,
    leftBlock: false,
    rightBlock: false,
    buttonCover: false,
    discount: false,
    coverImage: "img/me.png",
    sectionTitleContact: true,
    portfolio: true,
  });
};

exports.getKontakte = (req, res, next) => {
  res.render("kontakte", {
    coverTopic: req.i18n_texts.contactTopic,
    sectionTitleContact: false,
    portfolio: false,
  });
};

exports.postSendEmail = (req, res, next) => {
  const { inputName, inputEmail, inputTel, inputKomm } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let transporter = createTransporterSMTP();

  let mailOptions = {
    from: "from@example.com",
    to: "to@example.com",
    subject: "Msg from website",
    text: `
    Name: ${inputName}
    Email: ${inputEmail}
    Tel: ${inputTel}
    Komm: ${inputKomm}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: req.i18n_texts.validation["feedbackFail"],
      });
    }
    console.log("Email sent: %s", info.messageId);
    res
      .status(200)
      .json({ success: true, msg: req.i18n_texts.validation["success"] });
  });
  // res.status(200).json({ success: true, msg: "success" });
};

exports.postSendFeedback = (req, res, next) => {
  const { feedbackName, feedbackLink, feedbackMessage } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errorsFeedback: errors.array() });
  }

  let transporter = createTransporterSMTP();

  let mailOptions = {
    from: "from@example.com",
    to: "to@example.com",
    subject: "Feedback from website",
    text: `
    Name: ${feedbackName}
    Link: ${feedbackLink}
    Feedback: ${feedbackMessage}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: req.i18n_texts.validation["feedbackFail"],
      });
    }
    console.log("Feedback sent: %s", info.messageId);
    res
      .status(200)
      .json({ success: true, msg: req.i18n_texts.validation["success"] });
  });
  // res.status(200).json({ success: true, msg: "success" });
};

exports.getSetEn = (req, res) => {
  res.cookie("ulang", "en", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
};

exports.getSetDe = (req, res) => {
  res.cookie("ulang", "de", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
};
