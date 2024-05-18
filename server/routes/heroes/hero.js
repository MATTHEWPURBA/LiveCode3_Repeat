const express = require("express");

const HeroController = require("../../controllers/HeroController");
const authentication = require("../../middleware/authentication");
const router = express.Router();

router.use(authentication);
router.get("/", HeroController.getAllHeroes);

module.exports = router;
