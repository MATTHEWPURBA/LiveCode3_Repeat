const { Favourite, Hero } = require("../models");

class FavouriteController {
  static async postFavourite(req, res, next) {
    try {
      const { heroId } = req.params;

      const heroById = await Hero.findByPk(heroId);

      heroById
        ? null
        : // ini adalah bentuk function yang dibuat dengan langsung tanpa nama jadi langsung dijalankan setelah deklarasi,
          /** yaitu dengan cara membuat ()  di akhir*/
          (() => {
            throw { name: "HeroNotHere" };
          })();

      const userId = req.user.id;

      const addToFavo = await Favourite.create({
        userId: userId,
        heroId: heroId,
      });

      res.status(201).json(addToFavo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
