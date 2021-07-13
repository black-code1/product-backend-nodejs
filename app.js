const express = require('express');

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

//use : nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware.
app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app;