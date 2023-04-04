const { Model, DataTypes, Sequelize } = require('sequelize');

const VOTANTE_TABLE = 'votantes';

const VotanteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  document: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  neighborhood: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  affiliations: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  order: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  mesa: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  mesa_order: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  voto: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  us: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  local_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'locales',
      key: 'id',
    },
  },
  ciudad_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'ciudades',
      key: 'id',
    },
  },
  departamento_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'departamentos',
      key: 'id',
    },
  },
};

class Votante extends Model {
  static associate(models) {
    this.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local',
    });
    this.belongsTo(models.Ciudad, {
      foreignKey: 'ciudad_id',
      as: 'ciudad',
    });
    this.belongsTo(models.Departamento, {
      foreignKey: 'departamento_id',
      as: 'departamento',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VOTANTE_TABLE,
      modelName: 'Votante',
      timestamps: false,
    };
  }
}

module.exports = {
  VOTANTE_TABLE,
  VotanteSchema,
  Votante,
};
