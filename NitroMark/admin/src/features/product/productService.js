import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getaProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (values) => {
  console.log(values);
  const response = await axios.put(
    `${base_url}product/${values.id}`,
    { values },
    config
  );

  return response.data;
};
const deleteProduct = async (id) => {

  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const getProductSearch = async (value) => {
  const response = await axios.get(`${base_url}product/search?title=${value}`);
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
  getProductSearch
};

export default productService;
