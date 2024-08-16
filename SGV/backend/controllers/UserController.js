const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

  static async register(req, res) {

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

    try {

      //checando existência do usuário
      const userExists = await User.findOne({
        where: {email: email}
      });
      if(userExists) {
        res.status(422).json({message: 'E-mail já cadastrado'});
        return;
      }
    
      //criando uma senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      //criando usuário
      console.log('Criando novo usuário...');
      const newUser = await User.create({
        name,
        email,
        phone,
        password: passwordHash
      })

      
      await createUserToken(newUser, req, res);
      //return res.status(201).json({ message: 'Usuário registrado com sucesso' });

    } catch (error) {
      res.status(500).json({message: 'Erro no servidor, tente novamente mais tarde'})
    }
    
  }
  static async login(req, res) {
    const {email, password} = req.body;
    if(!email) {
      res.status(422).json({message: 'O email é obrigatório'})
      return;
    }
    if(!password) {
      res.status(422).json({message: 'Digite uma senha'})
      return;
    }
    //verificar se existe esse email no banco
    const verifyUser = await User.findOne({
      where: {email: email}
    });
    if(!verifyUser) {
      res.status(422).json({message: 'E-mail não cadastrado'});
      return;
    }
    //verificar se a senha coincide
    const checkPass = await bcrypt.compare(password, verifyUser.password)
    if(!checkPass){
      res.status(422).json({message: 'Senha inválida'});
      return;
    }
    await createUserToken(verifyUser, res, res);
  }

  static async checkUser(req,res) {
    let currentUser

    if(req.headers.authorization) {
      //chama helper
      const token = getToken(req);
      const decoded = jwt.verify(token, 'meusecret')

      currentUser = await User.findOne({ where: {id: decoded.id}});
       //podia remover na query:
      currentUser.password = undefined;
      


    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }
  static async getUserById(req,res) {
    const id = req.params.id;
    const user = await User.findOne({
      where: {id:id},
      attributes: { exclude: ['password']}
      });

    if(!user){
      res.status(422).json({message: "Usuário não encontrado"});
      return;
    }
    res.status(200).json( { user } );
  }

  static async editUser(req, res) {

  //const id = req.params.id;

    const {name, email, phone, password, confirmPassword} = req.body;



    const token = getToken(req);
    const user = await getUserByToken(token);

    if(!user){
      res.status(422).json({message: "Usuário não encontrado"});
      return;
    }

    //validação 

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }
    user.name = name;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    //checando existência do user

    /*
      const user = await User.findOne({
        where:{ id: id }
      })
    */

    const userExists = await User.findOne({where:{email: email}});


    //checando se email já está sendo usado (para não sobrescrever)
    if(user.email !== email && userExists) {
      res.status(422).json({
        message: 'Use outro e-mail'
      });
      return;
    }
    user.email = email;

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return;
    }

    user.phone = phone
    
    if(password != confirmPassword) {
      res.status(422).json({ message: 'Senhas não coincidem!' });
      return;
    } else if( password === confirmPassword && password != null ) {

      //nova senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }
    //let image = '';
    if(req.file) {
      user.image = req.file.filename;
    }

    try {
      // retornando dado atualizado
      const findAndUpdateUser = await User.findOne({where: {id: user.id}});
      await findAndUpdateUser.update({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            image: user.image
      })
      res.status(200).json({
        message: "Usuário atualizado com sucesso!"
      })
    } catch (error) {
      res.status(500).json({message: error});
      return;
    }
  }
}