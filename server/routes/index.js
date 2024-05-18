const express = require("express");
const router = express.Router();
const userRoute = require("../routes/users/user");
const heroRoute = require("../routes/heroes/hero");
const HeroController = require("../controllers/HeroController");

router.get("/", HeroController.homePage);
router.use("/users", userRoute);
router.use("/hero", heroRoute);

module.exports = router;
