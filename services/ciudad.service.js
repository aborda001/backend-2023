const { models } = require('../libs/sequelize');
const { Op, literal, fn } = require('sequelize');

class CiudadService {
  constructor() {}

  async findAll() {
    return await models.Ciudad.findAll();
  }

  async findAllLocales(id) {
    return await models.Local.findAll({
      where: {
        ciudad_id: id,
      },
    });
  }
}

module.exports = CiudadService;
