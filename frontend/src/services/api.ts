
import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3333",

  timeout: 10000,
});

export function setAuthToken(
  token: string | null
): void {
  if (token) {
    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
