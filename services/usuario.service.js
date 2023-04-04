const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.Usuario.create(data);

    delete newUser.dataValues.password;

    return newUser;
  }

  async findAll() {
    const usuarios = await models.Usuario.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: models.Departamento,
          as: 'departamento',
        },
      ],
    });

    return usuarios;
  }

  async findByUsername(username) {
    const user = await models.User.findOne({
      where: { username },
    });
    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
