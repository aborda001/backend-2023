const { Model, DataTypes, Sequelize } = require('sequelize');

const DEPARTAMENTO_TABLE = 'departamentos';

const DepartamentoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
};

class Departamento extends Model {
  static associate(models) {
    this.hasMany(models.Ciudad, {
      foreignKey: 'departamento_id',
      as: 'ciudades',
    });
    this.hasMany(models.Usuario, {
      foreignKey: 'departamento_id',
      as: 'usuarios',
    });
    this.hasMany(models.Votante, {
      foreignKey: 'local_id',
      as: 'votantes',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DEPARTAMENTO_TABLE,
      modelName: 'Departamento',
      timestamps: false,
    };
  }
}

module.exports = {
  DEPARTAMENTO_TABLE,
  DepartamentoSchema,
  Departamento,
};
