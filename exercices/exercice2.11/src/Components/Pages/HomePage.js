import imgPotter from '../../img/web2_image1.jpg';
import imgPinocchio from '../../img/web2_image2.jpg';

const HomePage = () => {
  const main = document.querySelector('main');
  main.style.backgroundColor = '#6b7c93'; // Rouge en hexadécimal
  main.innerHTML = 'Deal with the content of your HomePage';

  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container'; // Ajoutez une classe pour le style flex

  cardContainer.appendChild(generateCard(imgPotter));
  cardContainer.appendChild(generateCard(imgPinocchio));

  main.appendChild(cardContainer);
};

// Fonction pour générer une carte Bootstrap avec une photo
function generateCard(imagePath) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.width = '12rem';
  card.style.marginBottom = '20px'; // Ajoutez l'espace en dessous 

  const image = document.createElement('img');
  image.src = imagePath;
  image.className = 'card-img-top';
  image.alt = 'Card image cap';

  card.appendChild(image);

  return card;
}

export default HomePage;
