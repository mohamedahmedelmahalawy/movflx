export let query = "";
export const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=b5c4a823548bf14dec6c24c285b7adc1&page=2";
export const SEARCH_BASE_URL = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=b5c4a823548bf14dec6c24c285b7adc1&query=`;
export const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const API_URL =
//   "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=b5c4a823548bf14dec6c24c285b7adc1&page=1`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWM0YTgyMzU0OGJmMTRkZWM2YzI0YzI4NWI3YWRjMSIsInN1YiI6IjY0MDJjOWIyMzkyNzEyMDBlNTA2NWI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._DU_sV8Jar_cCBBtBCnwODkpjIBa61wRfArzSacSee8",
  },
};
