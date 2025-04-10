const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
  const token = req.headers['x-auth-token'];
  
  if (!token) {
    return res.status(401).json({ message: "Token topilmadi, iltimos, tizimga kiring!" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (error) {
    return res.status(400).json({ message: "Yaroqsiz token!" });
  }
}
 