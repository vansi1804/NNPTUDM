import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import enquiriesSevice from "./enquiriesSevice";



const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const createEnquiry = createAsyncThunk("user/enquiry", async (data, thunkAPi) => {
    try {
        return await enquiriesSevice.createEnquiry(data);
    } catch (error) {
        return thunkAPi.rejectWithValue(error);
    }
})

export const enquiriesSlice = createSlice({
    name: "enquiries",
    initialState: initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(createEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Send enquiry Successfully");
                }
            })
            .addCase(createEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

    }
})

export default enquiriesSlice.reducer;