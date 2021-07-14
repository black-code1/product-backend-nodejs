const express = require('express');

const router = express.Router();

const Thing = require('../models/thing');

router.post('/', (req, res, next) => {

  // Suppression _id envoyé par le front-end
  //delete req.body._id;
  //const thing = new Thing({
  //  ...req.body
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
    .catch(error => res.status(400).json({ error }));

});

router.get('/:id', (req, res, next) => {
  Thing
    .findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error: error }));
})

router.put('/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({ _id: req.params.id }, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
})

router.delete('/:id', (req, res, next) => {
  Thing
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted' }))
    .catch(error => res.status(400).json({ error: error }));
})

//use : nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware.
router.get('/' + '', (req, res, next) => {
  Thing
    .find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error: error }));
});

module.exports = router;