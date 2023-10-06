const path = require('node:path');
const { parse, serialize } = require('../utils/json');

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

function readAllFilms(orderBy) {
  const orderByTitle = orderBy?.includes('title') ? orderBy : undefined;
  let orderedList;
  const films = parse(jsonDbPath, FILMS);
  if (orderByTitle)
    orderedList = [...films].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedList = orderedList.reverse();

  const allFilms = orderedList ?? films;
  return allFilms;
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, FILMS);
  const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath, FILMS);

  const createdFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link
  };

  films.push(createdFilm);

  serialize(jsonDbPath, films);

  return createdFilm;
}

function getNextId() {
  const films = parse(jsonDbPath, FILMS);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
