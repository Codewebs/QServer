var Sequelize = require('sequelize');
const multer = require('multer');
var { Game, Player, Question,Category,SubCategory,Typegame,QuestionGame,GamePlayer } = require('../tables/seqtables');
var fs = require('fs');
var dir = './uploads';
var { enqueue } = require('../services/queueDemande');


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

app.post('/demandes', (req, res) => {
  enqueuePendingRequest(req.body);
  processPendingRequestsQueue();
  res.status(202).send('Demande de duel en cours');
});

app.put('/demandes/:id/accept', (req, res) => {
  enqueueAcceptedRequest(req.body);
  processAcceptedRequestsQueue();
  res.status(202).send('Demande de duel acceptée');
});

app.patch('/demandes/:id/modify', (req, res) => {
  enqueueModifiedRequest(req.body);
  processModifiedRequestsQueue();
  res.status(202).send('Demande de duel modifiée');
});

app.delete('/demandes/:id/cancel', (req, res) => {
  enqueueCancelledRequest(req.body);
  processCancelledRequestsQueue();
  res.status(202).send('Demande de duel annulée');
});


}