"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      Hero.belongsToMany(models.User, {
        through: models.Favourite,
        foreignKey: "heroId",
      });
    }
  }
  Hero.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cant be empty",
          },
          notEmpty: {
            msg: "Name cant be empty",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type cant be empty",
          },
          notEmpty: {
            msg: "Type cant be empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url cant be empty",
          },
          notEmpty: {
            msg: "Image Url cant be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Hero",
    }
  );
  return Hero;
};
