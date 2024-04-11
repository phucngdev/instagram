import axios from "axios";

const defaultUrl = "";
const BaseUrl = axios.create({
  baseURL: defaultUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
