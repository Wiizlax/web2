const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the films from the list
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const allFilms = readAllFilms(req?.query?.order);
  return res.json(allFilms);
});

// Read the film identified by an id in the FILMS
router.get('/:id', (req, res) => {
  const foundFilm = readOneFilm(req.params.id);

  if (!foundFilm) return res.sendStatus(404);

  return res.json(foundFilm);
});

// Create a film to be added to the FILMS.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link)
    return res.sendStatus(400).json({ error: 'Paramètres invalides' }); // error code '400 Bad request'

  const createdFilm = createOneFilm(title, duration, budget, link);

  return res.json(createdFilm);
});

// Delete a film from the FILMS based on its id
router.delete('/:id', (req, res) => {
  const deletedFilm = deleteOneFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedFilm = updateOneFilm(req.params.id, { title, content });

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;
