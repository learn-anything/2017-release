// Custom error for API.
class APIError extends Error {
  constructor(statusCode, ...params) {
    super(...params);

    // Maintain proper stack trace for where the error was thrown
    Error.captureStackTrace(this, APIError);

    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}


function logger(err, res) {
  // No response, later on we might want to handle this one differently (maybe
  // Sentry or something similar).
  if (!res) {
    console.error(err);
    return;
  }

  if (err.name === 'APIError') {
    res.status(err.statusCode);
  } else {
    res.status(500);
  }

  // Same as above for errors that are not APIError.
  console.log(`[${err.name}:${err.statusCode}] ${err.message}`);
  res.send({ error: err.message });
}


module.exports = {
  APIError,
  logger,
};
