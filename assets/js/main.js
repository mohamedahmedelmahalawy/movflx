import { isAuthenticated, userSignOut } from "./authFunctions.js";
import { fetchMovies, searchMovies } from "./functions.js";
import { API_URL, SEARCH_BASE_URL } from "./info.js";

const form = document.querySelector(".search");
const input = document.querySelector("#search-input");
const nextPage = document.querySelector(".fetch-next");
const previousPage = document.querySelector(".fetch-previous");
const profile = document.querySelector(".profile");
const logoutNav = document.querySelector(".logout");
const moviesContainer = document.querySelector(".movies-container");
const paginationBtns = document.querySelector(".pages");

let pageNum = 1;
let query = "";

document.addEventListener("DOMContentLoaded", async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    profile.style.display = "none";
    logoutNav.style.display = "block";
    paginationBtns.style.display = "block";
    moviesContainer.style.display = "grid";
    fetchMovies(API_URL);
  } else {
    profile.style.display = "block";
    logoutNav.style.display = "none";
    paginationBtns.style.display = "none";
    moviesContainer.style.display = "block";
    moviesContainer.innerHTML = `
      <h1 style="text-align: center; color: white; margin-top: 50px;">
        You are not Signed in. Please Sign in to enjoy Movies.
      </h1>
    `;
    form.style.display = "none";
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

  if (isAuthenticated() && query && query !== "") {
    pageNum = 1;
    searchMovies(pageNum, query);
  } else if (!query) {
    if (isAuthenticated()) {
      window.location.reload();
    }
  }
});

const logoutHandler = () => {
  userSignOut();
};

logoutNav.addEventListener("click", logoutHandler);

window.addEventListener("DOMContentLoaded", async () => {
  const authenticatedForChatbot = await isAuthenticated();
  if (authenticatedForChatbot) {
    const chatbotAuth = document.querySelector(".chatbot__auth");
    if (chatbotAuth) {
      chatbotAuth.style.display = "block";
    }
  }
});
