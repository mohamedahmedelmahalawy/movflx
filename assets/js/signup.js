import { fetchUsers } from "./authFunctions.js";

const emailSignup = document.querySelector(".email__signup input");
const passwordSignup = document.querySelector(".password__signup input");
const signupBtn = document.querySelector(".btn__signup");

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

const signupHandler = async (e) => {
  e.preventDefault();
  try {
    const users = await fetchUsers();
    const emailExists = users.find((user) => user.email === emailSignup.value);
    if (emailExists) {
      alert("Email already Existed");
      location.href = "../../login.html";

      return;
    }

    const res = await fetch("http://localhost:3000/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: Date.now(),
        email: emailSignup.value,
        password: passwordSignup.value,
      }),
    });
  } catch (error) {
    alert("can't reach the server");
  }
};

signupBtn.addEventListener("click", signupHandler);
