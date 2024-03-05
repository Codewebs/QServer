
module.exports = (sequelize, type) => sequelize.define('question', {
  question_id:{
    type:type.BIGINT(20), 
    primaryKey:true, 
    autoIncrement:true
  },
  question:type.STRING(255), 
  answer1:type.STRING(111), 
  answer2:type.STRING(50), 
  answer3:type.STRING(50), 
  answer4:type.STRING(50), 
  correctAnswer:type.STRING(100), 
  score:type.INTEGER, 
  clickedAnswer:type.STRING(100), 
  played:type.INTEGER, 
  corrected:type.INTEGER, 
  language:type.STRING(50),
  picPath:type.STRING(12),
  level:type.INTEGER, 
  subcategory_id:{
      type: type.INTEGER,
      references: {
          model: 'subcategory',
          key: 'subcategory_id', 
       }      
    },
},{
timestamps:false, 
paranoid:true, 
underscored:false, 
freezeTableName:true, 
tableName:'question' 
});


