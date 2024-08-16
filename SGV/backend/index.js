const express = require('express');
const cors = require('cors');


const app = express();


//conn
const conn = require('./db/conn')

//models
const User = require('./models/User');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const ConversationParticipants = require('./models/ConversationParticipants');

//associações
const defineAssociations = () => {
  // Relacionamento entre Conversation e Message
  Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'Messages' });
  Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'Conversation' });

  // Relacionamento entre User e Message
  User.hasMany(Message, { foreignKey: 'senderId', as: 'SentMessages' });
  User.hasMany(Message, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
  Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
  Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

  // Relacionamento muitos-para-muitos entre Conversation e User usando uma tabela intermediária
  Conversation.belongsToMany(User, { through: 'ConversationParticipants', as: 'Participants', foreignKey: 'conversationId' });
  User.belongsToMany(Conversation, { through: 'ConversationParticipants', as: 'Conversations', foreignKey: 'userId' });
};

defineAssociations();



//Routes Const
const UserRoutes = require('./routes/UserRoutes');
const MessageRoutes = require('./routes/MessageRoutes');
const UserSideBarRoute = require('./routes/UserSideBarRoute')


//Config JSON response
app.use(express.json());

//Solve CORS
app.use(cors( { credentials: true, origin: "http://localhost:3000" } ));

//Public Folder
app.use(express.static('public'));

//Routes
app.use('/users', UserRoutes)
app.use('/message', MessageRoutes)
app.use('/userSideBar', UserSideBarRoute)

async function connect() {
  
  try {
    //sincronizando os modelos com o banco
    await conn.sync()
    //{force:true}
    app.listen(5000);
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database: ', error);
  }
  
}
connect()