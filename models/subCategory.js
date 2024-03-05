
module.exports = (sequelize, type) => sequelize.define('subcategory', {
    subcategory_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },   
    name: type.STRING,  
    language: type.STRING,   
    imagePath: type.STRING,
    category_id: {
      type: type.INTEGER,
      references: {
          model: 'category',
          key: 'category_id', 
       }      
    },
    status: type.TINYINT,
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'subcategory'
});

