var Sequelize = require('sequelize');
const multer = require('multer');
var { Game, Player, Question,Category,SubCategory,Typegame,QuestionGame,GamePlayer } = require('../tables/seqtables');
var fs = require('fs');
var dir = './uploads';
var { enqueue } = require('../services/queuePrepaGame');


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir); 
}
  
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({storage: storage});

module.exports = (app) => {
  
app.post('/players', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).send(player);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création du joueur');
  }
});


app.post('/questions', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).send(question);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création de la question');
  }
})

app.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création de la catégorie');
  }
});


app.post('/subcategories', async (req, res) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(201).send(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création de la sous-catégorie');
  }
});


}