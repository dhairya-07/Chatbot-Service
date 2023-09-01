const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Chatbot.associate = (models) => {
    Chatbot.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Chatbot;
};
