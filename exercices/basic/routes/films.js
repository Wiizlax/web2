var express = require('express');
var router = express.Router();

const films = [
    {
        id: 1,
        title: 'the revenant',
        duration: 120,
        budget: 5,
        link: 'https://fr.wikipedia.org/wiki/The_Revenant'
    },
    {
        id: 2,
        title: 'Iron man',
        duration: 97,
        budget: 15,
        link: 'https://fr.wikipedia.org/wiki/Iron_Man_(film)'
    },
    {
        id: 3,
        title: 'Into the wild',
        duration: 135,
        budget: 3,
        link: 'https://fr.wikipedia.org/wiki/Into_the_Wild'
    }
]

router.get('/', function(req, res, next) {
   res.json(films);
  });

module.exports = router;