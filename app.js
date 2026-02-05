const express = require("express");
const cookieParser = require("cookie-parser");
const i18n = require("i18n-express");
const path = require("path");
const bodyParser = require("body-parser");

const mainRoutes = require("./routes/main");
const { handle404, errorHandle } = require("./middleware/errors");
const { limiter } = require("./middleware/utils");

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(limiter);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"),
    siteLangs: ["de", "en"],
    textsVarName: "translation",
    defaultLang: "de",
  })
);

app.use(mainRoutes);

app.use(handle404);

app.use(errorHandle);

const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
