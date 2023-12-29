const films = [];

function readAllMovies() {
  return films;
}

function addOneMovie(movie) {
  films.push(movie);
}

export { readAllMovies, addOneMovie };
