function errorHandler(error, req, res, next) {
  let status = error.status;
  let message = error.message;

  switch (error.name) {
    case "InvalidInput":
      status = 400;
      message = "Email/Password is required";
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((el) => el.message);
      break;

    case "JsonWebTokenError":
    case "InvalidToken":
      status = 401;
      message = "Unauthenticated";
      break;

    case "CuisineNotFound":
      status = 404;
      message = "Cuisine Not Found";
      break;

    case "HeroNotHere":
      status = 404;
      message = "Hero not found";
      break;

    case "ForbiddenAuth":
      status = 403;
      message = "You are not authorized";
      break;

    case "UserNotFound":
      status = 400;
      message = "Invalid input Email/Password";
      break;

    default:
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }

  res.status(status).json({
    message,
  });
}

module.exports = errorHandler;
