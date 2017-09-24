import empty from "is-empty";

function errorChecking(routeHandler) {
  return async function(req, res, next) {
    await routeHandler(req, res, next).catch(err => {
      console.log("Hit generic errorChecking() handler.");
      return handleError(err, req, res);
    });
  };
}

let handleError = function(err, req, res) {
  if (err.status) {
    res.status(empty(err.status) ? 400 : err.status).json({error: err.message || "No message provided."});
  } else {
    res.status(400).json({error: err.message || "No message provided."});
  }
};

module.exports = {
  errorChecking,
  handleError
};
