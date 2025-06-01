const isAuthenticated = async () => {
  const user = await fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await user.json();
  const authenticated = data.userLoggedin === true ? true : false;
  return authenticated;
};

const userState = async (id) => {
  const response = await fetch("http://localhost:3000/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userLoggedin: true,
      id,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update user state");
  }
  return await response.json();
};
const userSignOut = async (id) => {
  await fetch("http://localhost:3000/user", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      userLoggedin: false,
      id: null,
    }),
  });
  location.href = "../../index.html";
  return;
};

const fetchUsers = async () => {
  const res = await fetch("http://localhost:3000/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const getUserId = async (email, password) => {
  const users = await fetchUsers();
  console.log(users);
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    await userState(foundUser.id);
    return foundUser.id;
  }

  throw new Error("Invalid credentials");
};

const getCurrentUserId = async () => {
  const res = await fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data.id;
};

export {
  userState,
  fetchUsers,
  getUserId,
  isAuthenticated,
  userSignOut,
  getCurrentUserId,
};
