const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');

app.use('/api/stuff', stuffRoutes);


const dbURI = 'mongodb+srv://legrand:legrand@cluster0.jgecv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((resultat) => console.log('Connexion à MongoDB réussie !'))
  .catch((erreur) => console.log(erreur));

const app = express();




//app.use((req, res) => {
//  res.json({message: 'Votre requête a bien été reçue !'});
//});

// Elément de middleware N° : enregistre « Requête reçue ! » dans la console et passe l'exécution 
/*app.use((req, res, next) => {
  console.log('Requêt reçue !');
  next();
});*/

// Elément de middleware N°2 : ajoute un code d'état 201 à la réponse et passe l'exécution 
/*app.use((req, res, next) => {
  res.status(201);
  next();
});*/

// Elément de middleware N°3 : envoie la réponse JSON et passe l'exécution
/*app.use((req, res, next) => {
  res.json({message: 'Votre requête a bien été reçue !'});
  // next permet à chaque middleware de passer l'exécution au middleware suivant
  next();
});*/

// Elément de middleware N°4 : enregistre « Réponse envoyée avec succès ! » dans la console
/*app.use((req, res) => {
  console.log('Réponse evoyée avec succès !');
});*/

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



module.exports = app;


// Package body-parser pour extraire l'objet JSON de la demande frontend
// Package mongoose facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles