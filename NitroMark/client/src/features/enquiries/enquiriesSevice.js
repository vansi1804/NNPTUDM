import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const createEnquiry = async (data) => {
    const response = await axios.post(`${base_url}enquiry/`, data, config);

    return response.data;
};

const enquiriesSevice = {
    createEnquiry
}
export default enquiriesSevice;