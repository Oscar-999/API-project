'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {foreignKey: 'userId'}),
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'}),
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId',onDelete: 'CASCADE',})
    }
  }

  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};