const express = require('express');

const app = express();

//app.use((req, res) => {
//  res.json({message: 'Votre requête a bien été reçue !'});
//});

// Elément de middleware N° : enregistre « Requête reçue ! » dans la console et passe l'exécution 
app.use((req, res, next) => {
  console.log('Requêt reçue !');
  next();
});

// Elément de middleware N°2 : ajoute un code d'état 201 à la réponse et passe l'exécution 
app.use((req, res, next) => {
  res.status(201);
  next();
});

// Elément de middleware N°3 : envoie la réponse JSON et passe l'exécution
app.use((req, res, next) => {
  res.json({message: 'Votre requête a bien été reçue !'});
  // next permet à chaque middleware de passer l'exécution au middleware suivant
  next();
});

// Elément de middleware N°4 : enregistre « Réponse envoyée avec succès ! » dans la console
app.use((req, res) => {
  console.log('Réponse evoyée avec succès !');
});

module.exports = app;