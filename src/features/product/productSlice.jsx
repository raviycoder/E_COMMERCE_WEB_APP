import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductsById, createProduct, updateProduct } from './ProductAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProducts: null
};

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  'product/fetchProductsById',
  async (id) => {
    const response = await fetchProductsById(id);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProducts = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProducts = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product=>product.id === action.payload.id)
        state.products[index] = action.payload
        state.selectedProducts = action.payload
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {clearSelectedProduct} = productSlice.actions
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectedProductById = (state) => state.product.selectedProducts;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
