//404 not found handler
const createError = require("http-errors");
function notFoundHandler(req, res, next) {
  next(createError(404, "Your Requested Content Was not found!"));
}

// default error handler

function errorHandler(err, req, res, next) {
  //res.locals.title = "Error Page";
  //res.render("error", { title: "Error Page", }); // this is an alternative
  //res.render("error");

  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);

  if (res.locals.html) {
    //html responce
    res.render("error", {
      title: "Error Page",
    });
  } else {
    //json responce
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
