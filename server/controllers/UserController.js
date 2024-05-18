const { comparePassword } = require("../helpers/bcrypt");
const { createWebToken } = require("../helpers/jwt");
const { User } = require("../models/");

class UserController {

  static async registerUser(req, res, next) {

    try {
      const userInput = await User.create(req.body);
      res.status(201).json({
        id: userInput.id,
        email: userInput.email,
      });
    } catch (error) {
      next(error);
    }

  }
  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "UserNotFound" };
      }

      let compare = comparePassword(password, user.password);

      if (!compare) {
        throw { name: "UserNotFound" };
      }
      let token = createWebToken({
        id: user.id,
      });

      res.status(200).json({
        id: user.id,
        access_token: token,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
