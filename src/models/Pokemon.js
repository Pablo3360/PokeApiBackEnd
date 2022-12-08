const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
      }
    },
    health: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    attack: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    defense: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    speed: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    height: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    weight: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        min: 0,
        max: 100,
      }
    },
    img: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });
};