import { isAuthenticated } from "./authFunctions.js";
import { options, IMG_PATH } from "./info.js";
const moviesContainer = document.querySelector(".movies-container");

async function searchMovies(pageNum = 1, query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=b5c4a823548bf14dec6c24c285b7adc1&page=${pageNum}&query="${query}"`,
    options
  );
  const data = await res.json();
  // console.log(data.results);
  displayMovies(data.results);
}
async function fetchMovies(url, pagenum = 1) {
  const res = await fetch(url + pagenum, options);
  const data = await res.json();

  displayMovies(data.results);
}
async function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(async (movie) => {
    // console.log(movie);
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("article");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
            <a href="./details.html?id=${id}"> <figure class="movie__image">
                    <img
                        src="${IMG_PATH + poster_path}"
                        alt="${title}"
                    />
                    <div class="overview">
                    <h3>overview</h3>
                    <p>
                        ${overview.split(" ").slice(0, 20).join(" ")}
                    </p>
                </div>
                </figure>
                
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="rating ${rateColor(
                      vote_average
                    )}">${vote_average}</span>
                </div>
            </a>
        `;
    const authenticatedUser = await isAuthenticated();
    // console.log(authenticatedUser);
    if (authenticatedUser) {
      moviesContainer.append(movieEl);
    }
  });
}

function rateColor(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export { fetchMovies, displayMovies, searchMovies };
