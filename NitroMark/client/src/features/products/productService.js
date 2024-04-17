import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getaProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const rating = async (values) => {
  const response = await axios.put(`${base_url}product/rating`, values, config);
  return response.data;
};

const addtoWishList = async (id) => {
  const response = await axios.put(`${base_url}product/wishlist`, id, config);
  return response.data;
};

const getProductCategory = async (category) => {
  const response = await axios.get(`${base_url}product?category=${category}`);

  return response.data;
};

const getProductTags = async (tags) => {
  const response = await axios.get(`${base_url}product?tags=${tags}`);

  return response.data;
};

const getProductPrice = async (from, to) => {
  const response = await axios.get(`${base_url}product?price[gte]=${from}&price[lte]=${to}`);
  return response.data;
};

const getProductPriceReverse = async (from, to) => {
  const response = await axios.get(`${base_url}product?price[gte]=${from}&price[lte]=${to}&sort=-price`);
  return response.data;
};


const getProductPriceFrom = async (from) => {
  const response = await axios.get(`${base_url}product?price[gte]=${from}`);
  return response.data;
};

const getProductPriceTo = async (to) => {
  const response = await axios.get(`${base_url}product?price[lte]=${to}`);
  return response.data;
};

const getProductInStock = async () => {
  const response = await axios.get(`${base_url}product?quantity[gt]=0`);
  return response.data;
};

const getProductOutStock = async () => {
  const response = await axios.get(`${base_url}product?quantity[lte]=0`);
  return response.data;
};

const getProductSearch = async (value) => {
  const response = await axios.get(`${base_url}product/search?title=${value}`);
  return response.data;
};



const productService = {
  getProducts,
  getaProduct,
  rating,
  addtoWishList,
  getProductCategory,
  getProductTags,
  getProductPrice,
  getProductPriceFrom,
  getProductPriceTo,
  getProductInStock,
  getProductOutStock,
  getProductSearch,
  getProductPriceReverse
};

export default productService;
