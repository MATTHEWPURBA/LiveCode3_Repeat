"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      Hero.belongsToMany(models.User, {
        through: models.Favourite,
        foreignKey: "heroId",
        otherKey: "userId",
      });
    }
  }
  Hero.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hero",
    }
  );
  return Hero;
};
