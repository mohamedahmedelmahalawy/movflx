import { displayMovies, fetchMovies } from "./functions.js";
import { API_URL, SEARCH_BASE_URL } from "./info.js";
const form = document.querySelector(".search");
const input = document.querySelector("#search-input");
const nextPage = document.querySelector(".fetch-next");
const previousPage = document.querySelector(".fetch-previous");
let pageNum = 1;
let query = "";

function previousPageHandler(e) {
  e.preventDefault();
  if (pageNum > 1) {
    pageNum--;
    fetchMovies(API_URL + pageNum);
  }
}
function nextPageHandler(e) {
  e.preventDefault();
  pageNum++;
  console.log(API_URL.slice(0, 170) + pageNum);
  fetchMovies(API_URL.slice(0, 170), pageNum);
}
nextPage.addEventListener("click", nextPageHandler);
previousPage.addEventListener("click", previousPageHandler);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  query = input.value.trim();

  if (query && query !== "") {
    fetchMovies(SEARCH_BASE_URL + "1" + "&query=" + query);
    console.log(SEARCH_BASE_URL + "1" + "&query=" + query);
    input.value = "";
  } else {
    window.location.reload();
  }
});

fetchMovies(API_URL);
