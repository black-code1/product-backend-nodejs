const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');


const dbURI = 'mongodb+srv://legrand:legrand@cluster0.jgecv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbURI,{ useNewUrlParser: true,
  useUnifiedTopology: true })
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

app.post('/api/stuff', (req, res, next) => {
  
  // Suppression _id envoyé par le front-end
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  
});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing
      .updateOne({_id : req.params.id}, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch(error => res.status(400).json({ error }));
})

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing
      .deleteOne({_id : req.params.id})
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
})
app.get('/api/stuff/:id', (req, res, next) => {
  Thing
      .findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
})
//use : nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware.
app.get('/api/stuff', (req, res, next) => {
  Thing
      .find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
});


module.exports = app;


// Package body-parser pour extraire l'objet JSON de la demande frontend
// Package mongoose facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles