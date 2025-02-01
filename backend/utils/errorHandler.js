class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  const handleError = (err, res) => {
    const { statusCode = 500, message = 'Server Error' } = err;
    res.status(statusCode).json({ status: 'error', statusCode, message });
  };
  module.exports = { ErrorHandler, handleError };
  