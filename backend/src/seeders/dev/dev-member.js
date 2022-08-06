"use strict";
const uuid = require('uuid');

module.exports = {
  async up(queryInterface, _Sequelize) {
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
      "Members",
      [
        {
          id: uuid.v4(),
          name: "admin",
          password:
            "$2b$10$bpecd65htSqZDkZObfRyqOouEdoseZapo8TLEoPEOZEwFBT4ftDky",
          phone: "0123456789",
          lineId: "U028abf3896a5342e28e44a6957e44622",
          cardId: "0123456789",
          mail: "admin@mail.com",
          level: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          name: "general",
          password:
            "",
          phone: "9876543210",
          lineId: "Uf555939016b5fea1e0183162c0c13d06",
          cardId: "0476395939",
          mail: "general@mail.com",
          level: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
