const {Sequelize} = require('sequelize');

const sequelize = new Sequelize ('papoflow', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

//ping para verificar se funciona
async function mainDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso");
  } catch(error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}
mainDB()

module.exports = sequelize;