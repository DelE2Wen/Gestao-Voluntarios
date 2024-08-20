const getToken = (req) =>{
  const authHeader = req.headers.authorization;
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  
  return token;
}

module.exports = getToken;