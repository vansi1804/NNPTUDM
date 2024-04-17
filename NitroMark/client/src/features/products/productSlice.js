import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getaProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Rating = createAsyncThunk(
  "product/rating-product",
  async (values, thunkAPI) => {
    try {
      return await productService.rating(values);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const addToWishList = createAsyncThunk(
  "product/get-product-category",
  async (id, thunkAPI) => {
    try {
      return await productService.addtoWishList(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategory = createAsyncThunk(
  "product/category-product",
  async (category, thunkAPI) => {
    try {
      return await productService.getProductCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getProductTags = createAsyncThunk(
  "product/tags-product",
  async (tags, thunkAPI) => {
    try {
      return await productService.getProductTags(tags);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductPrice = createAsyncThunk(
  "product/price-product",
  async (values, thunkAPI) => {
    try {
      return await productService.getProductPrice(values.from, values.to);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductPriceReverse = createAsyncThunk(
  "product/price-product-reverse",
  async (values, thunkAPI) => {
    try {
      return await productService.getProductPriceReverse(values.from, values.to);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductPriceFrom = createAsyncThunk(
  "product/price-product-from",
  async (from, thunkAPI) => {
    try {
      return await productService.getProductPriceFrom(from);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductPriceTo = createAsyncThunk(
  "product/price-product-to",
  async (to, thunkAPI) => {
    try {
      return await productService.getProductPriceTo(to);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductinStock = createAsyncThunk(
  "product/get-product-inStock",
  async (thunkAPI) => {
    try {
      return await productService.getProductInStock();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductoutStock = createAsyncThunk(
  "product/get-product-outStock",
  async (thunkAPI) => {
    try {
      return await productService.getProductOutStock();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductonSearch = createAsyncThunk(
  "product/get-product-onSearch",
  async (value, thunkAPI) => {
    try {
      return await productService.getProductSearch(value);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBestSellers = createAsyncThunk(
  "product/get-product-best-sale",
  async (_, thunkAPI) => {
    try {
      return await productService.getBestSellers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productInfo = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(Rating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Rating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
      })
      .addCase(Rating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductPriceReverse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductPriceReverse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductPriceReverse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductPriceTo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductPriceTo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductPriceTo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductPriceFrom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductPriceFrom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductPriceFrom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductoutStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductoutStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductoutStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductinStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductinStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductinStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductonSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductonSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductonSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })







      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
