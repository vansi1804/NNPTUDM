import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
    const response = await axios.get(`${base_url}category/`, config);
    return response.data;
};

const getProductCategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config);

    return response.data;
};


const pCategoryService = {
    getProductCategories,
    getProductCategory,
};

export default pCategoryService;
