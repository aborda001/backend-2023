const { models } = require('../libs/sequelize');
const { Op, literal, fn } = require('sequelize');

class VotanteService {
  constructor() {}

  async findOneDepartamento(name) {
    const options = {
      where: { name },
    };
    return await models.Departamento.findOne(options);
  }

  async createDepartamento(data) {
    return await models.Departamento.create(data);
  }

  async findOneCiudad(name) {
    const options = {
      where: { name },
    };
    return await models.Ciudad.findOne(options);
  }

  async createCiudad(data) {
    return await models.Ciudad.create(data);
  }

  async findOneLocal(name) {
    const options = {
      where: { name },
    };
    return await models.Local.findOne(options);
  }

  async createLocal(data) {
    return await models.Local.create(data);
  }

  async create(data) {
    await models.Votante.create(data);
  }

  async findAll(query) {
    let options = {
      where: {},
      include: [
        {
          model: models.Local,
          as: 'local',
        },
        {
          model: models.Ciudad,
          as: 'ciudad',
        },
      ],
    };

    if (query.departamento_id) {
      options.where.departamento_id = query.departamento_id;
    }

    if (query.ciudad_id) {
      options.where.ciudad_id = query.ciudad_id;
    }

    if (query.local_id) {
      options.where.local_id = query.local_id;
    }

    if (query.document) {
      options.where.document = query.document;
    }

    if (query.fullname) {
      const fullname = query.fullname
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((name) => `%${name}%`);
      options.where.fullname = {
        [Op.iLike]: { [Op.all]: fullname },
      };
    }

    return await models.Votante.findAll(options);
  }

  async update(id, data) {
    const votante = await this.findOne(id);
    if (!votante) {
      return null;
    }

    await votante.update(data);
    return votante;
  }

  async findAllMesaOrder(query) {
    const options = {
      where: {
        mesa_order: query.code,
        departamento_id: query.departamento_id,
        ciudad_id: query.ciudad_id,
        local_id: query.local_id,
      },
    };

    return await models.Votante.findOne(options);
  }

  async findOne(id) {
    const options = {
      where: { id },
      include: [
        {
          model: models.Local,
          as: 'local',
        },
        {
          model: models.Ciudad,
          as: 'ciudad',
        },
      ],
    };
    return await models.Votante.findOne(options);
  }

  async getStadistics() {
    const votantes = await models.Votante.count({
      where: { voto: true },
    });

    const mesas = await models.Votante.count({
      where: {
        voto: true,
        mesa: {
          [Op.in]: literal(`(
              SELECT mesa
              FROM votantes
              WHERE voto = true
              GROUP BY mesa
              HAVING COUNT(voto) > 100
            )`),
        },
      },
      distinct: 'mesa',
    });

    const votantes_us = await models.Votante.count({
      where: { us: true, voto: true },
    });

    const efectividad = (votantes_us * 100) / votantes || 0;

    return { votantes, mesas, efectividad, votantes_us };
  }

  async getStadisticsGroupByCiudad() {
    const options = {
      include: [
        {
          model: models.Votante,
          as: 'votantes',
          attributes: [
            ['voto', 'voto'],
            ['us', 'us'],
          ],
        },
      ],
    };
    const votantes = await models.Ciudad.findAll(options);
    const response = [];
    votantes.forEach((ciudad) => {
      const votantes = ciudad.votantes.length;
      const votantes_us = ciudad.votantes.filter(
        (votante) => votante.us
      ).length;
      const efectividad = (votantes_us * 100) / votantes;
      response.push({
        ciudad: ciudad.name,
        votantes,
        votantes_us,
        efectividad,
      });
    });

    return response;
  }
}

module.exports = VotanteService;
