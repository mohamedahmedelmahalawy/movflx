let query = "";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=b5c4a823548bf14dec6c24c285b7adc1&page=1";
const SEARCH_BASE_URL = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=b5c4a823548bf14dec6c24c285b7adc1&query=`;
// const API_URL =
//   "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=b5c4a823548bf14dec6c24c285b7adc1&page=1`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWM0YTgyMzU0OGJmMTRkZWM2YzI0YzI4NWI3YWRjMSIsInN1YiI6IjY0MDJjOWIyMzkyNzEyMDBlNTA2NWI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._DU_sV8Jar_cCBBtBCnwODkpjIBa61wRfArzSacSee8",
  },
};

async function fetchMovies(url) {
  const res = await fetch(url, options);
  const data = await res.json();
  console.log(data.results);
}

fetchMovies(API_URL);

const form = document.querySelector(".search");
const input = document.querySelector("#search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  query = input.value.trim();
  if (query && query !== "") {
    fetchMovies(SEARCH_BASE_URL + query);
    input.value = "";
  } else {
    window.location.reload();
  }
});
