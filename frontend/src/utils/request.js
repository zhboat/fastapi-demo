import { downloadBlobFile } from "./base";

function redirectLogin() {
  window.localStorage.setItem("user", null);
  window.location.href = "/login";
}

export function request(
  url,
  options,
  auth = true,
  json = true,
  ignoreError = false,
) {
  const headers = new Headers();
  if (json) {
    headers.append("Content-Type", "application/json");
  }
  if (auth) {
    const authToken = window.localStorage.getItem("token");
    headers.append("Authorization", "Bearer " + JSON.parse(authToken));
  }
  const opts = { headers, ...options };
  url = "/api/v1" + url;

  return fetch(url, opts)
    .then((response) => {
      const respUrl = response.url;
      const contentType = response.headers.get("Content-Type");

      if (
        respUrl.indexOf("auth/login") === -1 &&
        response.status !== 200 &&
        !ignoreError
      ) {
        redirectLogin();
      }

      if (contentType === "application/octet-stream") {
        const contentDisposition = response.headers.get("Content-Disposition");
        const filename = contentDisposition
          .split(";")[1]
          .split("=")[1]
          .replaceAll('"', "");
        return response.blob().then((blob) => ({ blob, filename }));
      }

      if (contentType === "application/json") {
        return response.json();
      }

      return response.text();
    })
    .then((data) => {
      if (data && data.blob) {
        downloadBlobFile(data.blob, data.filename);
        return;
      }
      return data;
    });
}

export default request;
