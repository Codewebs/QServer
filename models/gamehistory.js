
module.exports = (sequelize, type) => sequelize.define('gamehistory', {
    game_id: {
      type: type.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },   
    player_1_id: {
      type: type.INTEGER,
      references: {
          model: 'player',
          key: 'player_id', 
       }      
  },  
    player_2_id: {
      type: type.INTEGER,
      references: {
          model: 'player',
          key: 'player_id', 
       }      
  },  
    winner_id: {
      type: type.BIGINT(20),
      references: {
          model: 'player',
          key: 'player_id', 
       }      
  },  
    score_player_1: type.STRING,  
    score_player_2: type.STRING,  
    start_date: type.DATE,  
    end_date: type.DATE,  
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
  tableName: 'gamehistory'
});
