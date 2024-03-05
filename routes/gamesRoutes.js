var Sequelize = require('sequelize');
var { Game, Player, Question,Category,SubCategory,Typegame,QuestionGame,GamePlayer } = require('../tables/seqtables');
var { enqueue } = require('../services/queuePrepaGame');


module.exports = (app) => {

app.post('/games', async (req, res) => {
  try {
    enqueue(req.body);
    res.status(202).send('Requête d\'enregistrement en cours');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'enregistrement du jeu');
  }
});

app.get('/games/search/date', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).send('Date non fournie.');
    }

    const games = await Game.findAll({
      where: {
        date: {
          $eq: date,
        },
      },
    });

    res.status(200).send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des jeux');
  }
});


// Route GET /games/search/range

app.get('/games/search/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).send('Dates de début et de fin non fournies.');
    }

    const games = await Game.findAll({
      where: {
        date: {
          $between: [startDate, endDate],
        },
      },
    });

    res.status(200).send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des jeux');
  }
});

}