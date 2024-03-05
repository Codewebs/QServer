
module.exports = (sequelize, type) => sequelize.define('questiongame', {
    game_id: {
      type: type.BIGINT(20),
      references: {
          model: 'games',
          key: 'game_id', 
       }      
    },   
    question_id: {
      type: type.BIGINT(20),
      references: {
          model: 'question',
          key: 'question_id', 
       }      
    },      
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'questiongame'
});
