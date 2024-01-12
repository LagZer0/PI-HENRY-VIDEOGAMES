const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genres', {
    // ID: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  }, 
  { freezeTableName: true, timestamps: false }
  );
};
