const emailSignup = document.querySelector(".email__signup input");
const passwordSignup = document.querySelector(".password__signup input");
const signupBtn = document.querySelector(".btn__signup");

let users = JSON.parse(localStorage.getItem("users")) || [];
const user = { id: "", email: "", password: "" };
const signupHandler = async (e) => {
  e.preventDefault();
  if (emailSignup.value === "" || passwordSignup.value === "") return;
  if (userSignedUp()) return;

  const user = {
    id: Date.now(),
    email: emailSignup.value,
    password: passwordSignup.value,
  };
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  emailSignup.value = "";
  passwordSignup.value = "";
};
const userSignedUp = () => {
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = savedUsers.some(
    (user) => user.email === emailSignup.value
  );

  if (userExists) return true;
  else return false;
};

signupBtn.addEventListener("click", signupHandler);
