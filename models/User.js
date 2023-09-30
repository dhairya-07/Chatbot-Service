const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'endUser'),
      allowNull: false,
    },
  });

  User.prototype.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.associate = (models) => {
    User.hasOne(models.Chatbot, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Conversation, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
