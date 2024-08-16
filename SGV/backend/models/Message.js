const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Message = db.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Conversations', 
      key: 'id'
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Message;