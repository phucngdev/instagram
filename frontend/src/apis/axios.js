import axios from "axios";

const defaultUrl = import.meta.env.VITE_API_URL;
const BaseUrl = axios.create({
  baseURL: defaultUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BaseUrl;
