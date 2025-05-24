const emailSignin = document.querySelector(".email__signin input");
const passwordSignin = document.querySelector(".password__signin input");
const signinBtn = document.querySelector(".btn__signin");

const users = [];
const user = { email: "", password: "" };
const signupHandler = async (e) => {
  e.preventDefault();
  if (emailSignin.value === "" || passwordSignin.value === "") return;

  userAuthenticated();
};
const userAuthenticated = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  users.forEach((user) => {
    if (
      user.email === emailSignin.value &&
      user.password === emailSignin.value
    ) {
      alert("you are authorized");
      console.log("user authenticated", user.id);

      return user.id;
    } else if (
      user.email === emailSignin.value &&
      user.password !== emailSignin.value
    ) {
      alert("wrong password");
      return;
    }
  });
};
