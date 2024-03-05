
module.exports = (sequelize, type) => sequelize.define('gameplayer', {
    game_id: {
      type: type.BIGINT(20),
      references: {
          model: 'games',
          key: 'game_id', 
       }      
    },   
    player_id: {
      type: type.BIGINT(20),
      references: {
          model: 'player',
          key: 'player_id', 
       }      
    },      
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'gameplayer'
});
