const Queue = require('bull');
const redis = require('redis');

// Créer une instance de client Redis
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

// Créer des files d'attente avec Bull
const gameQueue = new Queue('game data', 'redis://127.0.0.1:6379');
const secondaryQueue = new Queue('secondary game data', 'redis://127.0.0.1:6379');
const tertiaryQueue = new Queue('tertiary game data', 'redis://127.0.0.1:6379');

// Fonction pour ajouter des données de jeu à la file d'attente
async function enqueue(gameData) {
  const counts = await Promise.all([gameQueue.count(), secondaryQueue.count(), tertiaryQueue.count()]);
  if (counts[0] < MAX_QUEUE_SIZE) {
    await gameQueue.add(gameData);
  } else if (counts[1] < MAX_QUEUE_SIZE) {
    await secondaryQueue.add(gameData);
  } else {
    await tertiaryQueue.add(gameData);
  }
}

// Fonction pour traiter les données de jeu dans la file d'attente
gameQueue.process(async (job) => {
  try {
    await Game.create(job.data);
    console.log('Données du jeu traitées avec succès');
  } catch (error) {
    console.error('Erreur lors du traitement des données du jeu', error);
  }
});


// Fonctions similaires pour les files d'attente secondaire et tertiaire
secondaryQueue.process(async (job) => { 
  try {
    await Game.create(job.data);
    console.log('Données du jeu traitées avec succès');
  } catch (error) {
    console.error('Erreur lors du traitement des données du jeu', error);
  }
});

tertiaryQueue.process(async (job) => {
  try {
    await Game.create(job.data);
    console.log('Données du jeu traitées avec succès');
  } catch (error) {
    console.error('Erreur lors du traitement des données du jeu', error);
  }
});

module.exports = {
  enqueue,
};
