import axios from "axios";
import Cookies from "js-cookie";

const defaultUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get("token")?.slice(1, -1);
const BaseUrl = axios.create({
  baseURL: defaultUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}` || "",
  },
});

export default BaseUrl;
