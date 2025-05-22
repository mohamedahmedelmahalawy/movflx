import { searchMovies, fetchMovies } from "./functions.js";
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
    if (input.value.length !== 0) {
      searchMovies(pageNum, query);
    } else {
      fetchMovies(API_URL + pageNum);
    }
  }
}
function nextPageHandler(e) {
  e.preventDefault();
  pageNum++;
  if (input.value.length !== 0) {
    searchMovies(pageNum, query);
  } else {
    fetchMovies(API_URL.slice(0, 170), pageNum);
  }
}
nextPage.addEventListener("click", nextPageHandler);
previousPage.addEventListener("click", previousPageHandler);

form.addEventListener("input", (e) => {
  e.preventDefault();
  query = input.value.trim();

  if (query && query !== "") {
    pageNum = 1;
    searchMovies(pageNum, query);
    console.log(searchMovies(pageNum, query));
    // input.value = "";
  } else {
    window.location.reload();
  }
});

fetchMovies(API_URL);
