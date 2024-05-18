const { verifyWebToken } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "InvalidToken" };
    // console.log(access_token, "ini aksess");
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") {
      throw { name: "InvalidToken" };
    }
    let payload = verifyWebToken(token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
