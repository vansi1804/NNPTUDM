import axios from "axios";
import { config, getDataAPI, postDataAPI } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  // Gọi hàm login
  const response = await postDataAPI(`user/admin-login`, user, config);
  // Nếu phản hồi thành công
  if (response.data) {
    // Lưu thông tin người dùng vào local storage
    localStorage.setItem('user', JSON.stringify(response.data));

  }
  return response.data;
};

const refreshToken = async () => {
  const firstLogin = localStorage.getItem("user");
  if (firstLogin) {
    const response = await getDataAPI(`user/refresh`, { withCredentials: true });
    if (response.data) {
      // Lưu thông tin người dùng vào local storage
      localStorage.setItem('user', JSON.stringify(response.data));

    }
    return response.data;
  }
};


const logout = async () => {
  const response = await getDataAPI(`user/logout`, {}, true);
  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_url}user/order/${id}`, config);

  return response.data;
};

const getaUser = async (id) => {
  console.log("getaUser");
  console.log(id);
  const response = await axios.get(
    `${base_url}user/${id}`, config);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(
    `${base_url}user/${id}`, config);

  return response.data;
};

const blockUser = async (id) => {
  const response = await axios.put(`${base_url}user/block-user/${id}`, "", config);

  return response.data;
};


const unBlockUser = async (id) => {
  const response = await axios.put(`${base_url}user/unblock-user/${id}`, "", config);

  return response.data;
};

const updateUser = async (id) => {
  const response = await axios.put(`${base_url}user/edit-user/${id}`, "", config);

  return response.data;
};


const authService = {
  login,
  getOrders,
  getOrder,
  logout,
  deleteOrder,
  getaUser,
  deleteUser,
  blockUser,
  unBlockUser,
  updateUser,
  refreshToken,
};

export default authService;
