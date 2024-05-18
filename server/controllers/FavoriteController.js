const { Favourite } = require("../models");

class FavouriteController {
  static async postFavourite(req, res, next) {
    try {
      const { heroId } = req.params;
      const userId = req.user.id;
      console.log(req, "user Id nih");

      const addToFavo = await Favourite.create({
        userId: userId,
        heroId: heroId,
        power: 0,
      });

      res.status(201).json(addToFavo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
