
module.exports = (sequelize, type) => sequelize.define('player', {
    player_id: {
      type: type.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },   
    name: type.STRING, 
    country: type.STRING,   
    email: type.STRING,   
    imagePath: type.STRING,
  }, {
  timestamps: false,
  paranoid: true,
  underscored: false,
  freezeTableName: true,
  tableName: 'player'
});
