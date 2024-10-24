import axios from "axios";
import { API_ENDPOINT } from "./constants";

const API = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export { API };
