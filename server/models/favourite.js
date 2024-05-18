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
      heroId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
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
