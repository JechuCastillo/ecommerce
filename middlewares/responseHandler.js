//Handler para responder de una manera prolija y que otro programador entienda.
const responseHandler = (req, res, next) => {
  res.success = (data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
  };

  res.error = (message, statusCode = 400, details = null) => {
    res
      .status(statusCode)
      .json({ success: false, error: message, details });
  };

  next();
};

module.exports = responseHandler;
