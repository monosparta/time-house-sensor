'use strict';

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
    await queryInterface.bulkInsert('Seats', [
      {
        id: 1,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 2,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 3,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 4,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 5,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 6,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 7,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 8,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 9,
        state: 0,
        updatedAt: new Date()
      },
      {
        id: 10,
        state: 0,
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
