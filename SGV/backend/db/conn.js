const {Sequelize} = require('sequelize');

const sequelize = new Sequelize ('sistemagestaovoluntarios', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

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