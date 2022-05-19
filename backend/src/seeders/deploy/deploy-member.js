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
        // {
        //   username: "kyle",
        //   password: "<bcrypt-ed hash code>",
        //   phoneNumber: "",
        //   lineId: "",
        //   cardId: "",
        //   login: 0,
        //   level: 0,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        {
          username: "tilda",
          password: "<bcrypt-ed hash code>",
          phoneNumber: "",
          lineId: "",
          cardId: "4275148487",
          login: 0,
          level: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   username: "rosa",
        //   password: "<bcrypt-ed hash code>",
        //   phoneNumber: "",
        //   lineId: "",
        //   login: 0,
        //   level: 0,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
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
