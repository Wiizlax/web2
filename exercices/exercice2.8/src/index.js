import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import potterImage from './img/web2_image1.jpg';
import pinocchioImage from './img/web2_image2.jpg';

/*
const FILMS = [
  {
    id: 1,
    title: 'Harry Potter',
  },
  {
    id: 2,
    title: 'Pinocchio',
  },
];
*/

// eslint-disable-next-line spaced-comment
/*
function displayFilmsInMain(films) {
  const filmsAsString = renderFilmsFromString(films);
  const main = document.querySelector('main');
  main.innerHTML += filmsAsString;
}*/

// eslint-disable-next-line spaced-comment
/*
function renderFilmsFromString(films) {
  let allFilms = '<div class="movie-posters">';

  films?.forEach((film) => {
    allFilms.innerHTML += `<div class="image-card card">
                  <img src="${film.url}"
                  alt="Film ${film.title}" 
                  class="card-img-top" />
                </div>`;
  });

  allFilms += `</div>`;

  return allFilms;
}*/

function renderPotterImage(img) {
  const image = document.createElement('img');
  image.src = img;
  image.height = 300;
  image.title = 'Harry Potter';
  image.className = 'image-card card card-img-top';

  const container = document.createElement('div');
  container.className = 'card-container';

  container.appendChild(image);

  const main = document.querySelector('main');
  main.appendChild(container);
}

function renderPinocchioImage(img) {
  const image = document.createElement('img');
  image.src = img;
  image.height = 300;
  image.title = 'Pinocchio';
  image.className = 'image-card card';

  const container = document.createElement('div');
  container.className = 'card-container';

  container.appendChild(image);

  const main = document.querySelector('main');
  main.appendChild(container);
}


renderPotterImage(potterImage);
renderPinocchioImage(pinocchioImage);
