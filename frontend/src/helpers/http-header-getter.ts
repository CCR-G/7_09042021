import { getToken } from "./token-getter";

export function getHttpHeaders() {
  const headers = { "Content-type": "application/json", Authorization: "" };

  const token = getToken();
  if (token) {
    headers.Authorization = token;
  }

  return headers;
}
