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
        return res.json(films);
    }
    const minDuration = parseFloat(minimumDuration);
    if (isNaN(minDuration) || minDuration < 0) {
        return res.status(400).json({ error: 'paramètre invalide de minimum-duration' });
    }
    const filmsByDuration = films.filter(film => film.duration >= minDuration);
    res.json(filmsByDuration);
});


// Read the film identified by an id in the list
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfFilmFound = films.findIndex(film => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(404);

    res.json(films[indexOfFilmFound]);
});

// Create a film to be added to the list.
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if (!title || !duration || !budget || !link) return res.sendStatus(400).json({ error: 'Paramètres invalides' }); // error code '400 Bad request'

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const existingFilm = films.find(film => film.title.toLowerCase() === title.toLowerCase());
    if (existingFilm) {
        return res.status(409).json({ error: 'Un film avec le même titre existe déjà !' });
    }

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

// Delete a films from the list based on its id
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);

    const index = parseInt(req.params.id);

    const foundIndex = films.findIndex(film => film.id === index);

    if (foundIndex < 0) return res.sendStatus(404).json({ error: 'Pas d°index trouvé' });

    const itemsRemovedFromFilms = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromFilms[0];

    res.json(itemRemoved);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const content = req?.body?.content;

    console.log('POST /films');

    if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.status(404).json({ error: 'pas de films trouve avec cet id' });

    const uptdatedFilm = { ...films[foundIndex], ...req.body };

    films[foundIndex] = uptdatedFilm;

    res.json(uptdatedFilm);
});

// Update a film based on its id and new values for its parameters OR create a new one 
router.put('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const content = req?.body?.content;

    console.log('POST /films');

    if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.status(404).json({ error: 'pas de films trouve avec cet id' });

    const uptdatedFilm = { ...films[foundIndex], ...req.body };

    films[foundIndex] = uptdatedFilm;

    res.json(uptdatedFilm);
});



module.exports = router;