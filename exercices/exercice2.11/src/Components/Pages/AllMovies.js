import { readAllMovies } from './Movies';
import { clearPage } from '../../utils/render';

const ViewMoviePage = () => {
  clearPage();
  const movies = readAllMovies();

  const tableHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Duration (min)</th>
          <th scope="col">Budget (million)</th>
        </tr>
      </thead>
     <tbody>
       ${movies.map((movie) => renderMovieRow(movie)).join('')}
     </tbody>
   </table>
  `;

  const main = document.querySelector('main');
  main.innerHTML = tableHTML;
};

function renderMovieRow(movie) {
  return `
    <tr>
      <td><a href="${movie.link}" target="_blank">${movie.title}</a></td>
      <td>${movie.duration}</td>
      <td>${movie.budget}</td>
    </tr>
  `;
}

export default ViewMoviePage;
