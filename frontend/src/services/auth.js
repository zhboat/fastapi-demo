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

const AuthAPI = {
  login,
  logout,
};

export default AuthAPI;
