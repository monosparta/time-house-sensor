'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // -1: abnormal, 0: someone using, 1: can be used, 2: idle for too long
      state: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userCardId: {
        type: Sequelize.STRING,
        references: { model: 'Members', key: 'cardId' }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};