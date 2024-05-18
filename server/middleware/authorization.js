const { verifyWebToken } = require("../helpers/jwt");
const { Favourite } = require("../models");
const authorization = async (req, res, next) => {
  try {
    let FavHero = await Favourite.findByPk(req.params.id);
    if (!FavHero) {
      throw {
        name: "HeroNotHere",
      };
    }

    if (FavHero.userId === req.user.id) {
      next();
    } else {
      throw {
        name: "ForbiddenAuth",
      };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authorization;
