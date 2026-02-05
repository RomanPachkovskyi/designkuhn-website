exports.errorHandle = (err, req, res, next) => {
  res.status(err.status || 500).render("error", {
    coverTopic: req.i18n_texts.error,
    status: err.status || 500,
    message: err.message,
    portfolio: false,
  });
};

exports.handle404 = (req, res, next) => {
  const error = new Error(req.i18n_texts.error["404"]);
  error.status = 404;
  next(error);
};
