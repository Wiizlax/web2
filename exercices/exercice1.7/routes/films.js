const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const FILMS = [
  {
    id: 1,
    title: 'the revenant',
    duration: 120,
    budget: 5,
    link: 'https://fr.wikipedia.org/wiki/The_Revenant',
  },
  {
    id: 2,
    title: 'Iron man',
    duration: 97,
    budget: 15,
    link: 'https://fr.wikipedia.org/wiki/Iron_Man_(film)',
  },
  {
    id: 3,
    title: 'Into the wild',
    duration: 135,
    budget: 3,
    link: 'https://fr.wikipedia.org/wiki/Into_the_Wild',
  },
];

/* Read all the films from the list
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined;
  let orderedList;
  const listeFilms = parse(jsonDbPath, FILMS);
  if (orderByTitle) orderedList = [...listeFilms].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedList = orderedList.reverse();

  return res.json(orderedList ?? listeFilms);
});

// Read the film identified by an id in the FILMS
router.get('/:id', (req, res) => {
  const listeFilms = parse(jsonDbPath, FILMS);
  const idInRequest = parseInt(req.params.id, 10);
  const indexOfFilmFound = listeFilms.findIndex((film) => film.id === idInRequest);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(listeFilms[indexOfFilmFound]);
});

// Create a film to be added to the FILMS.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400).json({ error: 'Paramètres invalides' }); // error code '400 Bad request'

  const listeFilms = parse(jsonDbPath, FILMS);
  const lastItemIndex = listeFilms?.length !== 0 ? listeFilms.length - 1 : undefined;
  const lastId = lastItemIndex ? listeFilms[lastItemIndex]?.id : undefined;
  const nextId = lastItemIndex !== 0 ? lastId + 1 : 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link
  };

  listeFilms.push(newFilm);

  serialize(jsonDbPath, listeFilms);

  return res.json(newFilm);
});

// Delete a film from the FILMS based on its id
router.delete('/:id', (req, res) => {
  const listeFilms = parse(jsonDbPath, FILMS);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = listeFilms.findIndex((film) => film.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = listeFilms.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  serialize(jsonDbPath, listeFilms);

  return res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const listFilms = parse(jsonDbPath, FILMS);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = listFilms.findIndex((film) => film.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...listFilms[foundIndex], ...req.body };

  listFilms[foundIndex] = updatedFilm;

  serialize(jsonDbPath, listFilms);

  return res.json(updatedFilm);
});

module.exports = router;
