const { DataTypes } = require('sequelize');
//sequelize instancia de la conexion
module.exports = (sequelize) => {
  //fx que define el modelo:
  sequelize.define("Genres", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
      timestamps: false,
    });
};
