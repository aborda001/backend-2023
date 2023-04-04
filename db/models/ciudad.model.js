const { Model, DataTypes, Sequelize } = require('sequelize');

const CIUDAD_TABLE = 'ciudades';

const CiudadSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
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

class Ciudad extends Model {
  static associate(models) {
    this.belongsTo(models.Departamento, {
      foreignKey: 'departamento_id',
      as: 'departamento',
    });
    this.hasMany(models.Local, {
      foreignKey: 'ciudad_id',
      as: 'locales',
    });
    this.hasMany(models.Votante, {
      foreignKey: 'local_id',
      as: 'votantes',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CIUDAD_TABLE,
      modelName: 'Ciudad',
      timestamps: false,
    };
  }
}

module.exports = {
  CIUDAD_TABLE,
  CiudadSchema,
  Ciudad,
};
