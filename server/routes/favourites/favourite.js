const express = require("express");

const HeroController = require("../../controllers/HeroController");
const authentication = require("../../middleware/authentication");
const FavouriteController = require("../../controllers/FavoriteController");
const router = express.Router();

router.use(authentication);
router.get("/", FavouriteController.getAllFav);
router.post("/:heroId", FavouriteController.postFavourite);

module.exports = router;
