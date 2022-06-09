'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LineUser.init({
    lineId: DataTypes.STRING,
    login: DataTypes.BOOLEAN,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LineUsers',
  });
  return LineUser;
};