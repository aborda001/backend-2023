const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const { models } = require('../libs/sequelize');

class LoginService {
  constructor() {}

  async findByUsername(username) {
    const user = await models.Usuario.findOne({
      where: { username },
    });
    return user;
  }

  async signin({ username, password }) {
    const user = await this.findByUsername(username);
    if (!user) {
      return {
        code: 401,
        message: 'Credenciales invalidas',
      };
    }
    const isValid = await models.Usuario.comparePassword(password, user.password);
    if (!isValid) {
      return {
        code: 401,
        message: 'Credenciales invalidas',
      };
    }

    const usertosend = user.dataValues;
    delete usertosend.password;

    const token = jwt.sign({ usertosend }, config.jwtSecret, {
      expiresIn: 86400000,
    });
    return {
      ...usertosend,
      token,
      code: 200,
    };
  }
}

module.exports = LoginService;
