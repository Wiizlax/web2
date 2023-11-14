import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import potterImage from './img/web2_image1.jpg';
import pinocchioImage from './img/web2_image2.jpg';

document.getElementById('about').addEventListener('click', showAboutButton);

function showAboutButton() {
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const aboutButton = document.getElementById('about');

  main.innerHTML = `<div class="centered-text">Enchanté, je m'appelle Teuse et c'est moi qui ai créé cette incroyable page dynamique !</div>`;
  aboutButton.textContent = 'Back'; // Change le texte du bouton
  footer.style.backgroundColor = '#f0f0f0';
  main.style.backgroundColor = '#f0f0f0';

  aboutButton.removeEventListener('click', showAboutButton);
  aboutButton.addEventListener('click', showHomePageContent); // Modifie l'événement du clic
}

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

function showHomePageContent() {
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const aboutButton = document.getElementById('about');

  aboutButton.textContent = 'About';
  footer.style.backgroundColor = '#dc2929';
  main.style.backgroundColor = '#dc2929';

  main.innerHTML = '';
  aboutButton.removeEventListener('click', showHomePageContent);
  aboutButton.addEventListener('click', showAboutButton);

  renderPotterImage(potterImage);
  renderPinocchioImage(pinocchioImage);
}

showHomePageContent();
