const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '1234567');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if(!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
    // res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send({ error: 'Por favor login' });
  }
};

module.exports = auth;