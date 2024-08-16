const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Conversation = db.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Conversation;