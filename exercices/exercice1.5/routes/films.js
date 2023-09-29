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

/* Read all the films from the list of films
   GET /films?minimum-duration=value : sort by minimum duration value
*/
router.get('/', (req, res, next) => {
    const minimumDuration = req.query['minimum-duration'];
    if (!minimumDuration) {
        // Si le paramètre minimum-duration n'est pas spécifié, renvoyer tous les films.
        return res.json(films);
    }
    const minDuration = parseFloat(minimumDuration);
    if (isNaN(minDuration) || minDuration < 0) {
        // Si le paramètre minimum-duration n'est pas un nombre positif, renvoyer une erreur.
        return res.status(400).json({ error: 'Invalid minimum-duration parameter' });
    }
    // Filtrer les films dont la durée est supérieure ou égale à minDuration.
    const filmsByDuration = films.filter(film => film.duration >= minDuration);
    res.json(filmsByDuration);
});


// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfFilmFound = films.findIndex(film => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(404);

    res.json(films[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link
    };

    films.push(newFilm);

    res.json(newFilm);
});


module.exports = router;