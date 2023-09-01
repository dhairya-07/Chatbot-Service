const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderType: {
      type: DataTypes.ENUM('endUser', 'chatbot'),
      allowNull: false,
    },
    conversationIdFK: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'conversationId',
      },
      onDelete: 'CASCADE',
    },
  });
  return Message;
};
