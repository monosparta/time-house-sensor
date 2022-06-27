"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      no: {
        type: DataTypes.STRING,
      },
      // -1: abnormal, 0: someone using, 1: can be used, 2: idle for too long
      state: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stateChangedAt: {
        type: DataTypes.DATE,
      },
      memberId: {
        type: DataTypes.UUID,
        references: { model: "Members", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Seats",
    }
  );
  return Seat;
};
