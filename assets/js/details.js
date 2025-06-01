import { getCurrentUserId, isAuthenticated } from "./authFunctions.js";
import { options, IMG_PATH } from "./info.js";

const commentsList = document.querySelector(".comments__section ul");
const addCommentBtn = document.querySelector(".comments__section button");
const commentInput = document.querySelector(".comments__section input");
const commentForm = document.querySelector(".comments__section form"); // Get the entire form element

let currentMovieId = null; // Variable to store the ID of the currently viewed movie

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

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentMovieId = urlParams.get("id"); // Get movie ID from URL

  // Redirect if no movie ID is found in the URL (invalid access)
  if (!currentMovieId) {
    window.location.href = "./index.html";
    return;
  }

  const authenticated = await isAuthenticated(); // Check user authentication status

  // 1. Enforce authentication to view the page
  if (!authenticated) {
    alert("You must be logged in to view movie details."); // Optional: alert user
    // Redirect to your login page. Adjust the path if necessary.
    window.location.href = "./assets/pages/login.html";
    return; // Stop further execution on this page
  }

  // If authenticated, proceed to show movie details and comments
  await showMovieDetails();
  // Pass the authentication status to the comment display function
  await fetchAndDisplayComments(currentMovieId, authenticated);
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

  try {
    const movie = await fetchMovieById(currentMovieId);

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

addCommentBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const authenticated = await isAuthenticated(); // Re-check authentication before adding comment

  // This check is a fallback; the form should be hidden if not authenticated
  if (!authenticated) {
    alert("You must be logged in to add a comment.");
    return;
  }

  if (commentInput.value.trim() === "") {
    alert("Comment cannot be empty.");
    return;
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    // This case should ideally not happen if isAuthenticated() was true, but added for robustness
    alert("Error: Could not retrieve user ID. Please try logging in again.");
    return;
  }

  await addComment(currentMovieId, userId, commentInput.value.trim());
  commentInput.value = ""; // Clear input after successful comment
  await fetchAndDisplayComments(currentMovieId, authenticated); // Refresh comments list
});

const addComment = async (movieId, userId, commentText) => {
  const response = await fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      movieId: movieId,
      userId: userId,
      comment: commentText,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add comment");
  }
  return await response.json();
};

async function fetchCommentsForMovie(movieId) {
  // Fetch comments specifically for the current movie ID
  const res = await fetch(`http://localhost:3000/comments?movieId=${movieId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch comments: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

// Pass isAuthenticatedUser to control visibility of comment form and content
async function fetchAndDisplayComments(movieId, isAuthenticatedUser) {
  commentsList.innerHTML = ""; // Clear existing comments

  // 2. Enforce authentication to comment and view comments
  if (!isAuthenticatedUser) {
    commentForm.style.display = "none"; // Hide the comment input form
    const li = document.createElement("li");
    li.innerHTML = `<p>Please log in to view and add comments.</p>`;
    commentsList.appendChild(li);
    return; // Stop here if user is not authenticated for comments section
  }

  // If authenticated, ensure the comment form is visible
  commentForm.style.display = "block";

  try {
    const comments = await fetchCommentsForMovie(movieId);

    if (comments.length === 0) {
      const li = document.createElement("li");
      li.innerHTML = `<p>No comments yet. Be the first to comment!</p>`;
      commentsList.appendChild(li);
      return;
    }

    comments.forEach(async (comment) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h5>${comment.userId}</h5>
        <p>${comment.comment}</p>
      `;
      commentsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching or displaying comments:", error);
    const li = document.createElement("li");
    li.innerHTML = `<p>Failed to load comments. Please try again.</p>`;
    commentsList.appendChild(li);
  }
}
