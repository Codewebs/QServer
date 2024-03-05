var Sequelize = require('sequelize');
var { Enseignant,AllTaxe, Augmentation, Avantage, Heuretravail, Indemnite, Constant, Intervalle, Periode, Prime, Profil,
    ProfilTaxe, UserSchool,Taxe,Traitement, Typeelement,InscriptionEnseignant, Typeperiode, Utilisateur, AnneeScolaire,
    Service,Etablissement,Avance,Acompte,PaiementAvance,PaiementAcompte,Slide, LoginCount,Astuce } = require('../tables/seqtables');



const { Op } = require('sequelize');

module.exports = (app) => {

 // Route GET /categories

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      // Ajoutez des filtres et des options de tri ici
    });
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des catégories');
  }
});

// Route GET /categories/:id

app.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findPk(req.params.id);
    if (!category) {
      return res.status(404).send('Catégorie introuvable');
    }
    res.status(200).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération de la catégorie');
  }
});



// Route GET /questions

app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      // Ajoutez des filtres et des options de tri ici
    });
    res.status(200).send(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des questions');
  }
});

// Route GET /questions/:id

app.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findPk(req.params.id);
    if (!question) {
      return res.status(404).send('Question introuvable');
    }
    res.status(200).send(question);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération de la question');
  }
});


// Route GET /players

app.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll({
      // Ajoutez des filtres et des options de tri ici
    });
    res.status(200).send(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des joueurs');
  }
});

// Route GET /players/:id

app.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findPk(req.params.id);
    if (!player) {
      return res.status(404).send('Joueur introuvable');
    }
    res.status(200).send(player);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du joueur');
  }
});


// Route GET /games

app.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll({
      // Ajoutez des filtres et des options de tri ici
    });
    res.status(200).send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des jeux');
  }
});

// Route GET /games/:id

app.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findPk(req.params.id);
    if (!game) {
      return res.status(404).send('Jeu introuvable');
    }
    res.status(200).send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du jeu');
  }
});



// Route GET /games

app.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll({
      // Ajoutez des filtres et des options de tri ici
    });
    res.status(200).send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des jeux');
  }
});

// Route GET /games/:id

app.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findPk(req.params.id);
    if (!game) {
      return res.status(404).send('Jeu introuvable');
    }
    res.status(200).send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du jeu');
  }
});



}

