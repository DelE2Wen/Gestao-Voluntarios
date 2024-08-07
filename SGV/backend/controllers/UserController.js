const User = require('../models/User');

module.exports = class UserController {
  static async register(req, res){
    //regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    const paramsNecessary = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const paramsValidity = new Array();


    const {name, email, phone, password, confirmPassword} = req.body;

    //validações
    for(let itens of paramsNecessary) {
      if(!req.body[itens]) {
        paramsValidity.push(itens);
      }
    }

    if(paramsValidity.length > 0) {
      res.status(422).json({message: `É obrigatório ter: ${paramsValidity.join(', ')}`});
      return;
    }
    if(!emailRegex.test(email)) {
      res.status(422).json({message: "E-mail inválido"});
      return;
    }

    if(confirmPassword !== password) {
      res.status(422).json({message: `As senhas não coincidem`});
      return;
    }

    //checando existência do usuário
    try {
      const userExists = await User.findOne({
        where: {email: email}
      });
      if(userExists) {
        res.status(422).json({message: 'E-mail já cadastrado'});
        return;
      }
      
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
      
    } catch (error) {
      res.status(500).json({message: 'Erro no servidor, tente novamente mais tarde'})
    }
    
  }
}