import { merge } from "lodash";
import fetch from "node-fetch";

const API_URL = process.env.API_URL || "";
const API_KEY = process.env.API_KEY || "";

async function checkStatus(response) {
  if (response.status > 199 && response.status < 300) {
    return response.json();
  }

  if (response.status > 399 && response.status < 500) {
    const { errorMessage } = await response.json();

    throw new Error(
      `Response status: ${response.status} ${response.statusText}.
Message: ${errorMessage}`,
    );
  }

  throw new Error(
    `Response status ${response.status} - ${response.statusText}.`,
  );
}

export async function request(endpoint: string, options: any) {
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
