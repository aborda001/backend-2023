const { config } = require('./../config/config');
const { models } = require('./../libs/sequelize');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(401).json({
      message: 'Permisos insuficientes',
      code: 401,
    });

  try {
    const token = auth.split(' ')[1];
    const decoded = await jwt.verify(token, config.jwtSecret);
    const user = await models.Usuario.findByPk(decoded.usertosend.id);
    req.user = decoded;
    if (!user)
      return res.status(401).json({
        message: 'Permisos insuficientes',
        code: 401,
      });
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Permisos insuficientes',
      code: 401,
    });
  }
};

const checkRoles = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.usertosend.role)) {
      next();
    } else {
      return res.status(401).json({
        message: 'Permisos insuficientes',
        code: 403,
      });
    }
  };
};

module.exports = { verifyToken, checkRoles };
