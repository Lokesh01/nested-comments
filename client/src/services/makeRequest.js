import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  withCredentials: true,
});

export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      // * The nullish coalescing operator (??) is used to provide a default value when the value on its left-hand side is null or undefined.
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}
