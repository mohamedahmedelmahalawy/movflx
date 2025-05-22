import { fetchMovies } from "./functions.js";
import { API_URL } from "./info.js";
const form = document.querySelector(".search");
const input = document.querySelector("#search-input");

fetchMovies(API_URL);

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
