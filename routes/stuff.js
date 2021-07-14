const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// importation du middleware
const auth = require('../middleware/auth');

router.post('/', auth, stuffCtrl.createThing);

router.put('/:id', auth, stuffCtrl.modifyThing);

router.get('/:id', auth, stuffCtrl.getOneThing)

router.delete('/:id', auth, stuffCtrl.deleteThing)

router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;