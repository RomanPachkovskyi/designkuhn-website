const express = require("express");
const { body } = require("express-validator");

const {
  getIndex,
  getHoreca,
  getKleideranfertigung,
  getHeimtextilien,
  getKontakte,
  getMyself,
  postSendEmail,
  postSendFeedback,
  getSetDe,
  getSetEn,
} = require("../controllers/main");

const router = express.Router();

router.get("/", getIndex);
router.get("/horeca", getHoreca);
router.get("/kleideranfertigung", getKleideranfertigung);
router.get("/heimtextilien", getHeimtextilien);
router.get("/kontakte", getKontakte);
router.get("/myself", getMyself);
router.get("/set-de", getSetDe);
router.get("/set-en", getSetEn);

router.post(
  "/send-email",
  [
    body("inputName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["noName"];
      })
      .customSanitizer((value) => {
        return value
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }),
    body("inputEmail")
      .isEmail()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["wrongEmail"];
      })
      .normalizeEmail(),
    body("inputTel")
      .isNumeric()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["wrongTel"];
      }),
    body("inputKomm").trim().escape(),
  ],
  postSendEmail
);

router.post(
  "/send-feedback",
  [
    body("feedbackName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["noName"];
      })
      .customSanitizer((value) => {
        return value
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }),
    body("feedbackLink")
      .if((value, { req }) => req.body.feedbackLink !== "")
      .isURL()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["wrongUrl"];
      }),
    body("feedbackMessage")
      .trim()
      .escape()
      .notEmpty()
      .withMessage((value, { req, location, path }) => {
        return req.i18n_texts.validation["noFeedback"];
      }),
  ],
  postSendFeedback
);

module.exports = router;
