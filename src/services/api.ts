import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data",
  timeout: 20000,
});