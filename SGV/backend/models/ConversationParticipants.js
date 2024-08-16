const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const ConversationParticipants = db.define('ConversationParticipants', {
  conversationId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Conversations', 
      key: 'id'
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', 
      key: 'id'
    },
  },
});

module.exports = ConversationParticipants;
