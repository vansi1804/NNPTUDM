import axios from "axios";
import { base_url } from "./baseUrl";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    Accept: "application/json",
  },
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${base_url}${url}`, post, {
    headers: { Authorization: token }
  })
  return res;
}

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${base_url}${url}`, {
    headers: { Authorization: token }
  })
  return res;
}