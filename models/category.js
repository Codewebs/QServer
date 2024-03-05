
module.exports = (sequelize, type) => sequelize.define('category', {
    category_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },   
    name: type.STRING,  
    language: type.STRING,   
    imagePath: type.STRING,
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'category'
});
