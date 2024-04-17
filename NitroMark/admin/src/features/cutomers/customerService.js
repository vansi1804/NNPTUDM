import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

const getUsersSearch = async (value) => {
  const response = await axios.get(`${base_url}user/search-user?title=${value}`, config);
  return response.data;
};


const customerService = {
  getUsers, getUsersSearch
};

export default customerService;
