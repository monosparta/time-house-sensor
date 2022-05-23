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
      // -1: abnormal, 0: someone using, 1: can be used, 2: idle for too long
      state: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      memberId: {
        type: DataTypes.INTEGER,
        references: { model: "Members", key: "id" },
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
