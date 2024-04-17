import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../features/user/userSlice";
import pCategorySlice from "../features/pCategory/pCategorySlice";
import productReducer from "../features/products/productSlice";
import enquiriesReducer from "../features/enquiries/enquiriesSlice";
import blogCategoryReducer from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    pCategory: pCategorySlice,
    products: productReducer,
    enquiries: enquiriesReducer,
    blog: blogCategoryReducer,
  },
});
