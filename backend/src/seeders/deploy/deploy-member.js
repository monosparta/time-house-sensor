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
        //   name: "kyle",
        //   password: "<bcrypt-ed hash code>",
        //   phone: "",
        //   lineId: "",
        //   cardId: "",
        //   level: 0,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        {
          name: "tilda",
          password: "<bcrypt-ed hash code>",
          phone: "",
          lineId: "",
          cardId: "",
          level: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   name: "rosa",
        //   password: "<bcrypt-ed hash code>",
        //   phone: "",
        //   lineId: "",
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
