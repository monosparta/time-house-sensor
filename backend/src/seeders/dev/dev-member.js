"use strict";

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
      "Members",
      [
        {
          id: 1,
          username: "admin",
          password:
            "$2b$10$bpecd65htSqZDkZObfRyqOouEdoseZapo8TLEoPEOZEwFBT4ftDky",
          phoneNumber: "",
          lineId: "U028abf3896a5342e28e44a6957e44622",
          cardId: "0123456789",
          mail: "",
          level: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: "general",
          password:
            "$2b$10$680EkA5SRl4/O.VhGaJf0OlJfGbGvIZDtMy3jOu619pv3.Eihr8re",
          phoneNumber: "",
          lineId: "Uf555939016b5fea1e0183162c0c13d06",
          cardId: "9876543210",
          mail: "",
          level: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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
