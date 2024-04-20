import axios from "axios";
import Cookies from "js-cookie";

const BaseUrlAuth = axios.create({
  baseURL: defaultUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default BaseUrlAuth;
