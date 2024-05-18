"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.User);
      Favourite.belongsTo(models.Hero);
    }
  }
  Favourite.init(
    {
      heroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Hero Id cant be empty",
          },
          notEmpty: {
            msg: "Hero Id cant be empty",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id cant be empty",
          },
          notEmpty: {
            msg: "User Id cant be empty",
          },
        },
      },
      role: DataTypes.STRING,
      power: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favourite",
      hooks: {
        beforeCreate(favourite) {
          favourite.role = "-";
          favourite.power = 0;
        },
      },
    }
  );
  return Favourite;
};
