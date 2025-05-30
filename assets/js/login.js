import { fetchUsers, getUserId } from "./authFunctions.js";
const emailSignin = document.querySelector(".email__signin input");
const passwordSignin = document.querySelector(".password__signin input");
const signinBtn = document.querySelector(".btn__signin");
const form = document.querySelector(".form__signin");

const signinHandler = async () => {
  const userId = await getUserId(emailSignin.value, passwordSignin.value);
  window.location.href = "../../";
};

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signinHandler();
});
