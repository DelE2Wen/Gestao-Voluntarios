const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const { Sequelize } = require('sequelize');

module.exports = class MessageController {
  static async sendMessage(req, res) {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user.id;

      //console.log("Sender ID:", senderId);
      //console.log("Receiver ID:", receiverId);
      //console.log("Message:", message);

        // Encontra ou cria a conversa entre os dois usuários
      let conversation = await Conversation.findOne({
        include: [{
          model: User,
          as: 'Participants',
          where: {
            id: [senderId, receiverId]
          }
        }],
        group: ['Conversation.id'],
        having: Sequelize.literal(`COUNT(*) = 2`) // Verifica se ambos os usuários estão na conversa
      });

      if (!conversation) {
        conversation = await Conversation.create();
        await conversation.addParticipants([senderId, receiverId]);
      }

      // Cria a nova mensagem associada à conversa
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        conversationId: conversation.id
      });

      res.status(201).json(newMessage);

    } catch (error) {
      console.error("Erro no send do MessageController: ", error.message);
      res.status(500).json({ error: "Erro de servidor" });
    }
  }
  static async getMessages(req, res) {
    try {
      //receiver
      const { id: userToChatId } = req.params;
      const senderId = Number(req.user.id);
      const receiverId = Number(userToChatId);
  
      if (senderId === receiverId) {
        return res.status(400).json({ error: "Você não pode conversar com você mesmo." });
      }
  
      // Encontrar a conversa que tem ambos os usuários como participantes
      const conversation = await Conversation.findOne({
        include: [{
          model: User,
          as: 'Participants',
          where: {
            id: [senderId, receiverId]
          },
          through: { attributes: [] }
        }],
      });
  
      if (!conversation) {
        return res.status(404).json({ error: "Conversa não encontrada" });
      }
  
      // Verifica se a conversa tem exatamente os dois participantes
      // Verifica também se ao menos o receiver é quem diz ser
      // Ainda está preso a 2 users...
      const participants = await conversation.getParticipants();
      if (participants.length !== 2 || !participants.some(p => p.id === senderId) || !participants.some(p => p.id === receiverId)) {
        return res.status(404).json({ error: "Conversa não encontrada" });
      }
  
      // find todas as mensagens enviadas pelo senderId para receiverId nessa conversa:
      const messages = await Message.findAll({
        where: {
          senderId,
          receiverId
        },
        order: [['createdAt', 'ASC']],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Erro no get do MessageController: ", error.message);
      res.status(500).json({ error: "Erro de servidor" });
    }
  }
}
