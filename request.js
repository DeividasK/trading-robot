import { merge } from "lodash";
import fetch from "node-fetch";

function checkStatus(response) {
  if (response.status > 199 && response.status < 300) {
    return response.json();
  }

  return response;
}

export async function request(url, options) {
  const defaultOptions = {
    headers: {
      Accept: "application/json; charset=UTF-8",
      "Content-Type": "application/json; charset=UTF-8",
      version: 2,
    },
  };

  return fetch(url, merge(defaultOptions, options)).then(checkStatus);
}
