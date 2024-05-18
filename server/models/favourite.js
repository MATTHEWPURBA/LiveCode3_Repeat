"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Favourite.belongsTo(models.Hero, {
        foreignKey: "heroId",
      });
    }
  }
  Favourite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      /** 
       * Response (201 - Created)

      ```json
      {
        "id": 1,
        "userId": 1,
        "heroId": 1,
        "role": "-",
        "power": 0
      }
      ```
      UNTUK BISA ADA ID NYA DISITU MAKA HARUS DI TAMBAH ID DI MODEL
       */

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
      role: {
        type: DataTypes.STRING,
      },
      power: {
        type: DataTypes.INTEGER,
      },
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
