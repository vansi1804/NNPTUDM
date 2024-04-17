import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";


const getBlogCate = async () => {
    const response = await axios.get(`${base_url}blogcategory/`, "", config);

    return response.data;
};

const getBlogs = async () => {
    const response = await axios.get(`${base_url}blog/`, "", config);

    return response.data;
};

const getaBlog = async (id) => {
    const response = await axios.get(`${base_url}blog/${id}`, config);

    return response.data;
};



const blogSevice = {
    getBlogCate, getBlogs, getaBlog
}
export default blogSevice;