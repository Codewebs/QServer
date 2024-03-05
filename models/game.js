
module.exports = (sequelize, type) => sequelize.define('games', {
  game_id: {
    type: type.BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
  },
  description: type.STRING(50),
  typegame_id: {
      type: type.INTEGER,
      references: {
          model: 'typegame',
          key: 'typegame_id',
       }      
  },    
  subcategory_id: {
      type: type.INTEGER,
      references: {
          model: 'subcategory',
          key: 'subcategory_id', 
       }      
  },
  statut: type.INTEGER(1) 
},{
   indexes: [
    { fields: ['typegame_id'], },    
    { fields: ['subcategory_id'], },
    { fields: ['createdAt'], },
    { fields: ['updatedAt'], },
  ],
  }, {
  timestamps: true,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName:'games'
});
