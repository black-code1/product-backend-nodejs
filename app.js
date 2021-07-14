const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importation du route
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


const dbURI = 'mongodb+srv://legrand:legrand@cluster0.jgecv.mongodb.net/test?retryWrites=true&w=majority';

// connection à la base de donnée mongodb
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((erreur) => console.log(erreur));

const app = express();

// Problème de CORS
app.use((req, res, next) => {
  // d'accéder à notre API depuis n'importe quelle origine ( '*' ) 
  res.setHeader('Access-Control-Allow-Origin', '*');
  // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// définissez sa fonction json comme middleware global pour votre application,
app.use(bodyParser.json());

// enregistrement des route attendu par le frontend dans l'application
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;


// Package body-parser pour extraire l'objet JSON de la demande frontend
// Package mongoose facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles