const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
    {
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      conversationId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'Conversations',
    }
  );

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
      foreignKey: 'conversationIdFK',
      onDelete: 'CASCADE',
    });

    Conversation.belongsTo(models.Chatbot, {
      foreignKey: 'chatbotId',
      onDelete: 'CASCADE',
    });

    Conversation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Conversation;
};
