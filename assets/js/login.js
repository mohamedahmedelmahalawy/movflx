import { fetchUsers, getUserId } from "./authFunctions.js";
const emailSignin = document.querySelector(".email__signin input");
const passwordSignin = document.querySelector(".password__signin input");
const signinBtn = document.querySelector(".btn__signin");
const form = document.querySelector(".form__signin");

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

const signinHandler = async () => {
  const userId = await getUserId(emailSignin.value, passwordSignin.value);
  window.location.href = "../../";
};

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signinHandler();
});
