"use strict";
const _ = require("../../utils/seat");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Seats",
      [
        {
          id: 1,
          no: "A1",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          no: "A2",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          no: "A3",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          no: "A4",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          no: "B1",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          no: "B2",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          no: "B3",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          no: "C1",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          no: "C2",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          no: "C3",
          state: _.state.AVAILABLE,
          stateChangedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
