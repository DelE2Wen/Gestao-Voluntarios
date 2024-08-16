const jwt = require('jsonwebtoken');

const User = require('../models/User')

//pegando usuário via token jwt

const getUserByToken = async (token) => {

  if(!token) {
    return res.status(401).json({message: 'Acesso Negado!'});
  }

  const decoded = jwt.verify(token, 'meusecret');
  const userId = decoded.id

  const user = await User.findOne({where:{id: userId}});
  return user;
}

module.exports = getUserByToken;