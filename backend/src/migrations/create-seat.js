"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no: {
        type: Sequelize.STRING,
      },
      // -1: abnormal, 0: someone using, 1: can be used, 2: idle for too long
      state: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      memberId: {
        type: Sequelize.UUID,
        references: { model: "Members", key: "id" },
      },
      stateChangedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};
