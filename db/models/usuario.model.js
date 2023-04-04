const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'usuario',
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

class Usuario extends Model {
  static associate(models) {
    this.belongsTo(models.Departamento, {
      foreignKey: 'departamento_id',
      as: 'departamento',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        beforeUpdate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      },
    };
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = {
  USUARIO_TABLE,
  UsuarioSchema,
  Usuario,
};
