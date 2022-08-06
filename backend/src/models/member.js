"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  Member.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      cardId: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      mail: {
        type: DataTypes.STRING,
      },
      lineId: {
        type: DataTypes.STRING,
      },
      // 0: admin, 1: general, 2: others
      level: {
        type: DataTypes.INTEGER,
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
      modelName: "Members",
    }
  );
  return Member;
};
