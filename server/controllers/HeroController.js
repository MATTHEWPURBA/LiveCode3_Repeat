const { Hero } = require("../models");

class HeroController {
  static async homePage(req, res, next) {
    try {
      res.status(200).json({ message: "Hello World" });
    } catch (error) {
      next(error);
    }
  }
  static async getAllHeroes(req, res, next) {
    try {
      const dataCuisine = await Hero.findAll();
      res.status(200).json(dataCuisine);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HeroController;
