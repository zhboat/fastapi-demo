import request from "../utils/request";

function login(params) {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  });
}

function logout() {
  return request("/auth/logout", {
    method: "POST",
  });
}

function resetPassword(params) {
  return request("/auth/reset_password", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

function getUser() {
  return request("/auth/user", {
    method: "GET",
  });
}

const AuthAPI = {
  login,
  logout,
  resetPassword,
  getUser,
};

export default AuthAPI;
