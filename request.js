import { merge } from "lodash";
import fetch from "node-fetch";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

function checkStatus(response) {
  if (response.status > 199 && response.status < 300) {
    return response.json();
  }
  console.log(`response`, response);

  throw new Error(
    `Response status ${response.status}. Error ${response.statusText}.`,
  );
}

export async function request(endpoint, options) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(`${API_URL}${endpoint}`, merge(defaultOptions, options)).then(
    checkStatus,
  );
}
