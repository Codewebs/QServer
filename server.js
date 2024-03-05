//const webpack = require('webpack');
//const middleware = require('webpack-dev-middleware');
var express = require("express");
var path = require("path");
//const cors = require('cors');
//const webpackConfig = require('./webpack.config.dev');
var bodyParser = require("body-parser"); 
var formidable = require('express-formidable')
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()
var logger = require("morgan");
var swaggerJSDoc = require("swagger-jsdoc");

var helmet = require("helmet");

var Cors = require("cors");

var connect = require("./routes/connect");


var app = express();
var port = process.env.PORT || 4000
var socket_io = require("socket.io");
var io = socket_io();
//Vues

const swaggerDefinition = {
  info: {
    title: 'Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:3003',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {  
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


const whitelist = [
  "http://localhost:4000/",
  "http://localhost:3000/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use(Cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Cache-Control', 'no-store');
  
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(logger('dev'));
app.use(helmet());

//Routes
app.set('socketio', io);

io.listen(app.listen(port, function(){
  console.log("Server Port : ", port);
})); 
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('IPV4adress: '+add);
})
app.io = io.on("connection", (socket) =>{
  console.log("One Socket connecté:" + socket.id);
  io.to(socket.id).emit("private", "Bienvenue au sur l'application", socket.id);
}); 
app.use("/api", connect);

require('./routes/create')(app); // Fichier pour les operations d'ajout des tuples
//require('./routes/delete')(app); // Contient toutes les operations de suppression
//require('./routes/read')(app); // Dans ce fichier sont stoquées les operations de lecture
require('./routes/search')(app); // Contient toutes les operations de recherche
//require('./routes/update')(app); // Contient les operations de mises à jour

