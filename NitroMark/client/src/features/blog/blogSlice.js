import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogSevice from "./blogSevice";



const initialState = {
    blogCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};



export const getBlogCategory = createAsyncThunk("user/blog-category", async (thunkAPi) => {
    try {
        return await blogSevice.getBlogCate();
    } catch (error) {
        return thunkAPi.rejectWithValue(error);
    }
})

export const getBlogs = createAsyncThunk("user/blog", async (thunkAPi) => {
    try {
        return await blogSevice.getBlogs();
    } catch (error) {
        return thunkAPi.rejectWithValue(error);
    }
})

export const getaBlog = createAsyncThunk("user/get-blog", async (id, thunkAPi) => {
    try {
        return await blogSevice.getaBlog(id);
    } catch (error) {
        return thunkAPi.rejectWithValue(error);
    }
})

export const blogCategorySlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogCategory = action.payload;
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getaBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getaBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogDetail = action.payload;
            })
            .addCase(getaBlog.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

    }
})

export default blogCategorySlice.reducer;