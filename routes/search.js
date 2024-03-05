var Sequelize = require('sequelize');
var { Game, Player, Question,Category,SubCategory,Typegame,QuestionGame,GamePlayer } = require('../tables/seqtables');

 
// Modèle Subcategory
SubCategory.belongsToMany(Question, { through: 'SubcategoryQuestion' });

// Modèle Question
Question.belongsToMany(SubCategory, { through: 'SubcategoryQuestion' });

// Game peut etre joué par plusieurs joueurs
Game.belongsToMany(Player, { through: GamePlayer });
// Player peut jouer à plusieurs jeux
Player.belongsToMany(Game, { through: GamePlayer });
// Game a plusieurs questions
Game.belongsToMany(Question, { through: QuestionGame });
// Question peut etre jouée dans plusieurs jeux
Question.belongsToMany(Game, { through: QuestionGame });



const { Op } = require('sequelize');

module.exports = (app) => {


app.get('/categories/search/name', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send('Nom de catégorie non fourni.');
    }

    const categories = await Category.findAll({
      where: {
        name: {
          $like: `%${name}%`, // Recherche partielle avec `%`
        },
      },
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des catégories');
  }
});


app.get('/categories/search/language', async (req, res) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).send('Langue non fournie.');
    }

    const categories = await Category.findAll({
      where: {
        language: {
          $eq: language,
        },
      },
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des catégories');
  }
});



app.get('/subcategories/search/name', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send('Nom de sous-catégorie non fourni.');
    }

    const subcategories = await SubCategory.findAll({
      where: {
        name: {
          $like: `%${name}%`, // Recherche partielle avec `%`
        },
      },
    });

    res.status(200).send(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des sous-catégories');
  }
});


app.get('/subcategories/search/category', async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).send('ID de catégorie non fourni.');
    }

    const subcategories = await SubCategory.findAll({
      where: {
        categoryId: {
          $eq: categoryId,
        },
      },
    });

    res.status(200).send(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des sous-catégories');
  }
});



app.get('/subcategories/search/language', async (req, res) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).send('Langue non fournie.');
    }

    const subcategories = await SubCategory.findAll({
      where: {
        language: {
          $eq: language,
        },
      },
    });

    res.status(200).send(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des sous-catégories');
  }
});


app.get('/subcategories/:id/questions', async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    const subcategory = await SubCategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).send('Sous-catégorie introuvable');
    }

    const questions = await subcategory.getQuestions();

    res.status(200).send(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des questions');
  }
});


}