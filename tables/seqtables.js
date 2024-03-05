var Sequelize = require('sequelize');
 
var CategoryModel = require('../models/category');
var GameModel = require('../models/game');
var PlayerModel = require('../models/player');
var GamePlayerModel = require('../models/gameplayer');
var TypegameModel = require('../models/typegame');
var QuestionModel = require('../models/question');
var QuestionGameModel = require('../models/questiongame');
var SubCategoryModel = require('../models/subCategory');
var DemandeModel = require('../models/demande');



const sequelize = new Sequelize(DBase, DBuser, DBpass, {
    host : DBhost, 
    dialect : DBdialect, 
    logging : console.log 
});

const Category = CategoryModel(sequelize, Sequelize);
const SubCategory = SubCategoryModel(sequelize, Sequelize);
const Player = PlayerModel(sequelize, Sequelize);
const Typegame = TypegameModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Game = GameModel(sequelize, Sequelize);
const GamePlayer = GamePlayerModel(sequelize, Sequelize);
const QuestionGame = QuestionGameModel(sequelize, Sequelize);
const Demande = DemandeModel(sequelize, Sequelize); 

GamePlayer.associate = function(models) {
    GamePlayer.belongsTo(models.Game, { foreignKey: 'game_id' });
    GamePlayer.belongsTo(models.Player, { foreignKey: 'player_id' });
  };
  

sequelize.sync().then(() => {
      console.log("Category, Game,Player,Typegame, Question,SubCategoryModel,GamePlayer,QuestionGame, Demande db tables have been created.");
});

module.exports = { Category, Game, Player, Question,SubCategory,Typegame,GamePlayer,QuestionGame,Demande  };


