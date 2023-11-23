export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getCurrentDateTime(isLicense = false) {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  const datetime = new Date(now.getTime() - tzOffset)
    .toISOString()
    .slice(0, -5);

  if (isLicense) {
    return datetime.replaceAll("-", "_").replace("T", "-");
  }
  return datetime.replaceAll("T", "-");
}

export function isAuthorized(code) {
  return "(Y)" === code.slice(-3);
}

export function parseAuthorizedCode(code) {
  if (isAuthorized(code)) {
    return code.slice(0, -3);
  }
  return code;
}

export function downloadBlobFile(data, filename) {
  const downloadUrl = window.URL.createObjectURL(data);
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = filename;
  downloadLink.style = "display: none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}

export function getFormData(target) {
  const form = new FormData(target);
  const data = {};

  form.forEach((value, key) => {
    if (!value) {
      return;
    }
    if (value === "on") {
      value = true;
    }
    data[key] = value;
  });
  return data;
}

export function timeout(m) {
  return new Promise((r) => setTimeout(r, m));
}
