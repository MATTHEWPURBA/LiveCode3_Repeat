const express = require("express");
const router = express.Router();
const userRoute = require("../routes/users/user");
const heroRoute = require("../routes/heroes/hero");
const favoRoute = require ("../routes/favourites/favourite")
const HeroController = require("../controllers/HeroController");

router.get("/", HeroController.homePage);
router.use("/users", userRoute);
router.use("/hero", heroRoute);
router.use("/favourites",favoRoute)


module.exports = router;
