const { Departamento, DepartamentoSchema } = require('./departamento.model');
const { Ciudad, CiudadSchema } = require('./ciudad.model');
const { Local, LocalSchema } = require('./local.model');
const { Votante, VotanteSchema } = require('./votante.model');
const { Usuario, UsuarioSchema } = require('./usuario.model');

const setupModels = (sequelize) => {
  Departamento.init(DepartamentoSchema, Departamento.config(sequelize));
  Ciudad.init(CiudadSchema, Ciudad.config(sequelize));
  Local.init(LocalSchema, Local.config(sequelize));
  Votante.init(VotanteSchema, Votante.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));

  Departamento.associate(sequelize.models);
  Ciudad.associate(sequelize.models);
  Local.associate(sequelize.models);
  Votante.associate(sequelize.models);
  Usuario.associate(sequelize.models);
};

module.exports = setupModels;
