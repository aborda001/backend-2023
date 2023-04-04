'use strict';

const {
  DEPARTAMENTO_TABLE,
  DepartamentoSchema,
} = require('../models/departamento.model');
const { CIUDAD_TABLE, CiudadSchema } = require('../models/ciudad.model');
const { LOCAL_TABLE, LocalSchema } = require('../models/local.model');
const { VOTANTE_TABLE, VotanteSchema } = require('../models/votante.model');
const { USUARIO_TABLE, UsuarioSchema } = require('../models/usuario.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DEPARTAMENTO_TABLE, DepartamentoSchema);
    await queryInterface.createTable(CIUDAD_TABLE, CiudadSchema);
    await queryInterface.createTable(LOCAL_TABLE, LocalSchema);
    await queryInterface.createTable(VOTANTE_TABLE, VotanteSchema);
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.drop(DEPARTAMENTO_TABLE);
    await queryInterface.drop(CIUDAD_TABLE);
    await queryInterface.drop(LOCAL_TABLE);
    await queryInterface.drop(VOTANTE_TABLE);
    await queryInterface.drop(USUARIO_TABLE);
  },
};
