const { Model, DataTypes, Sequelize } = require('sequelize');

const LOCAL_TABLE = 'locales';

const LocalSchema = {
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
  ciudad_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'ciudades',
      key: 'id',
    },
  },
};

class Local extends Model {
  static associate(models) {
    this.belongsTo(models.Ciudad, {
      foreignKey: 'ciudad_id',
      as: 'ciudad',
    });
    this.hasMany(models.Votante, {
      foreignKey: 'local_id',
      as: 'votantes',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOCAL_TABLE,
      modelName: 'Local',
      timestamps: false,
    };
  }
}

module.exports = {
  LOCAL_TABLE,
  LocalSchema,
  Local,
};
