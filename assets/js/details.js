import { options, IMG_PATH } from "./info.js";

document.addEventListener("DOMContentLoaded", () => {
  showMovieDetails();
});

async function fetchMovieById(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&include_video=true&api_key=b5c4a823548bf14dec6c24c285b7adc1`,
    options
  );
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

async function showMovieDetails() {
  const detailContainer = document.querySelector(".detail");
  const movieImage = detailContainer.querySelector(".image img");
  const movieName = detailContainer.querySelector(".name");
  const movieRating = detailContainer.querySelector(".rating");
  const movieOverview = detailContainer.querySelector(".overview");

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    window.location.href = "./index.html";
    return;
  }

  try {
    const movie = await fetchMovieById(movieId);

    if (movie) {
      movieImage.src = IMG_PATH + movie.poster_path;
      movieImage.alt = movie.title;
      movieName.textContent = movie.title;
      movieRating.innerHTML = `Rating: <span class="${rateColor(
        movie.vote_average
      )}">${movie.vote_average}</span>`;
      movieOverview.textContent = movie.overview;
    } else {
      detailContainer.innerHTML = "<p>Movie not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    detailContainer.innerHTML =
      "<p>Failed to load movie details. Please try again later.</p>";
  }
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
