"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataHero = require("../data/heroes.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Heros", dataHero, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Heros", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
