"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Members", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      cardId: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      mail: {
        type: Sequelize.STRING,
        unique: true,
      },
      lineId: {
        type: Sequelize.STRING,
      },
      // 0: admin, 1: general, 2: others
      level: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Members");
  },
};
