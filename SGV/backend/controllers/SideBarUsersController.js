const User = require('../models/User');
const {Sequelize} = require('sequelize');

module.exports = class SideBarUsers {
  static async pickUsers(req, res) {
    try {
      
      const loggedInUserId = req.user.id;

      //não seleciona o user logado ne = not equal
      const filterUsers = await User.findAll({
        attributes:  ['id', 'name', 'image'],
        where: {
          id: {
            [Sequelize.Op.ne]: loggedInUserId
          }
        },
        });
        res.status(200).json(filterUsers);

    } catch (error) {
      res.status(500).json({error: "Erro no servidor"})
    }
  }
}