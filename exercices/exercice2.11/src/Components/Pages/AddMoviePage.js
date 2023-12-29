import { addOneMovie } from './Movies';
import { clearPage } from '../../utils/render';

const AddMoviePage = () => {
  clearPage();

  const formHTML = `
    <form id="addMovieForm">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required minlength="2">

      <label for="duration">Duration (min):</label>
      <input type="number" id="duration" name="duration" required min="1">

      <label for="budget">Budget (million):</label>
      <input type="number" id="budget" name="budget" required min="0">

      <label for="link">Link:</label>
      <input type="url" id="link" name="link" required>

      <button type="submit">Add Film</button>
    </form>
  `;

  const main = document.querySelector('main');
  main.innerHTML = formHTML;

  const addMovieForm = document.getElementById('addMovieForm');
  addMovieForm.addEventListener('submit', handleFormSubmit);
};

function handleFormSubmit(event) {
  event.preventDefault();

  const title = event.target.elements.title.value;
  const duration = event.target.elements.duration.value;
  const budget = event.target.elements.budget.value;
  const link = event.target.elements.link.value;

  const movie = {
    title,
    duration: parseInt(duration, 10),
    budget: parseFloat(budget),
    link,
  };

  addOneMovie(movie);
  console.log('New Movie:', movie);

  // Ajouter la redirection ici vers la page affichant la liste des films enregistrés
  // Utilisez par exemple window.location.href = '/path/to/movie-list-page';
}

export default AddMoviePage;
