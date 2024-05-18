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

  static async getAllFav(req, res, next) {
    try {
      /** userId ini untuk seleksi favourite user yang sedang log in */
      const userId = req.user.id;
      /** userId ini untuk seleksi favourite user yang sedang log in */
      const dataFavourite = await Favourite.findAll({
        /** nah seleksi nya disini nih untuk biar yang ditammpilin tuh favourite nya punya user yang log in aja */
        where: {
          userId: userId,
        },
        /** nah seleksi nya disini nih untuk biar yang ditammpilin tuh favourite nya punya user yang log in aja */
        include: [
          {
            model: Hero,
            attributes: ["id", "name", "type", "imageUrl"],
          },
        ],
      });
      res.json(dataFavourite);
    } catch (error) {
      next(error);
    }
  }

  static async updateHeroFavourite(req, res, next) {
    try {
      const dataFavouritebyId = await Favourite.findByPk(req.params.id);
      //ini bikin params.id karena dibuat /:id disebelah favourites
      console.log(req.params, "ini req params");
      if (!dataFavouritebyId) {
        throw {
          name: "HeroNotHere",
        };
      }

      let { role, power } = req.body;

      await dataFavouritebyId.update({ role, power });

      await dataFavouritebyId.reload();

      res.status(200).json({
        message: "Hero has been updated",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
