import { downloadBlobFile } from "./base";

// function redirectLogin() {
//   window.localStorage.setItem("user", null);
//   window.location.href = "/login";
// }

export function request(url, options, json = true, ignoreError = false) {
  const headers = new Headers();
  if (json) {
    headers.append("Content-Type", "application/json");
  }
  const opts = { headers, ...options };
  let filename = "";
  url = "/api/v1" + url;
  return fetch(url, opts)
    .then((r) => {
      // if (r.status !== 200 && !ignoreError) {
      //   redirectLogin();
      // }
      // const cloned_r = r.clone();
      const contentType = r.headers.get("Content-Type");
      if (contentType === "application/octet-stream") {
        const contentDisposition = r.headers.get("Content-Disposition");
        filename = contentDisposition
          .split(";")[1]
          .split("=")[1]
          .replaceAll('"', "");
        return r.blob();
      }
      if (contentType === "application/json") {
        // cloned_r.json().then((res) => {
        //   if (res.status === 10001) {
        //     redirectLogin();
        //   }
        // });
        return r.json();
      }
      return r.text();
    })
    .then((data) => {
      if (data.type === "application/octet-stream") {
        downloadBlobFile(data, filename);
        return;
      }
      return data;
    });
}

export default request;
