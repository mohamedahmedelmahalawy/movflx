import { isAuthenticated, userSignOut } from "./authFunctions.js";
import { fetchMovies, searchMovies } from "./functions.js";
import { API_URL, SEARCH_BASE_URL } from "./info.js";
const form = document.querySelector(".search");
const input = document.querySelector("#search-input");
const nextPage = document.querySelector(".fetch-next");
const previousPage = document.querySelector(".fetch-previous");
const profile = document.querySelector(".profile");
const logoutNav = document.querySelector(".logout");
const movies = document.querySelectorAll(".movies-container article");

let pageNum = 1;
let query = "";

addEventListener("load", async (event) => {
  console.log(isAuthenticated());
  if (await isAuthenticated()) {
    profile.style.display = "none";
    logoutNav.style.display = "block";
  } else {
    profile.style.display = "block";
    logoutNav.style.display = "none";
  }
});

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

const logoutHandler = () => {
  userSignOut();
};

logoutNav.addEventListener("click", logoutHandler);

movies.forEach((movie) => {
  movie.addEventListener("click", (e) => {
    console.log(e.target);
  });
});

window.addEventListener("DOMContentLoaded", async () => {
  if (await isAuthenticated()) {
    const chatbotAuth = document.querySelector(".chatbot__auth");
    chatbotAuth.style.display = "block";
  }
});

fetchMovies(API_URL);
