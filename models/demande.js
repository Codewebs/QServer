
module.exports = (sequelize, type) => sequelize.define('demande', {
    demande_id: {
      type: type.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },   
    player_1_id: {
      type: type.BIGINT(20),
      references: {
          model: 'player',
          key: 'player_id', 
       }      
    },  
    player_2_id: {
      type: type.BIGINT(20),
      references: {
          model: 'player',
          key: 'player_id', 
       }
    },
    proposal_date: type.DATE,  
    created_date: type.DATE,  
    expiration_date: type.DATE,  
    status: type.STRING,  
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
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'demande'
});
