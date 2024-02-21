import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductsById, createProduct, updateProduct, fetchProductImages, deleteProductImage, deleteAllImage, deleteOneImage, SearchProducts, checkedBrands, checkedCategory, updateStocks } from './ProductAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProducts: null,
  images:null,
  searchProduct:[]
};

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const patchBrandsAsync = createAsyncThunk(
  'product/checkedBrands',
  async (filter) => {
    const response = await checkedBrands(filter);
    return response.data;
  }
);
export const patchCategoriesAsync = createAsyncThunk(
  'product/checkedCategory',
  async (filter) => {
    const response = await checkedCategory(filter);
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
export const fetchSearchProductsAsync = createAsyncThunk(
  'product/SearchProducts',
  async (search) => {
    const response = await SearchProducts(search);
    return response.data;
  }
);
export const fetchProductImagesasync = createAsyncThunk(
  'product/fetchProductImages',
  async () => {
    const response = await fetchProductImages();
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
export const updateStocksAsync = createAsyncThunk(
  'product/updateStocks',
  async (updates) => {
    const response = await updateStocks(updates);
    return response.data;
  }
);
export const deleteProductImageAsync = createAsyncThunk(
  'product/deleteProductImage',
  async (index) => {
    const response = await deleteProductImage(index);
    return response.data;
  }
);
export const deleteAllImageAsync = createAsyncThunk(
  'product/deleteAllImage',
  async () => {
    const response = await deleteAllImage();
    return response.data;
  }
);
export const deleteOneImageAsync = createAsyncThunk(
  'product/deleteOneImage',
  async ({index, productId}) => {
    const response = await deleteOneImage(index, productId);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination, admin, itemprice }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin, itemprice);
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
      .addCase(fetchSearchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchProduct = action.payload;
      })
      .addCase(fetchSearchProductsAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchProductImagesasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductImagesasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.images = action.payload;
      })
      .addCase(fetchProductImagesasync.rejected, (state) => {
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
      })
      .addCase(updateStocksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStocksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product=>product.id === action.payload.id)
        state.products[index] = action.payload
        state.selectedProducts = action.payload
      })
      .addCase(updateStocksAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteProductImageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductImageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.images = action.payload
      })
      .addCase(deleteProductImageAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteAllImageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAllImageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.images = action.payload
      })
      .addCase(deleteAllImageAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteOneImageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOneImageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.selectedProducts = action.payload
      })
      .addCase(deleteOneImageAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(patchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.brands = action.payload
      })
      .addCase(patchBrandsAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(patchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.categories = action.payload
      })
      .addCase(patchCategoriesAsync.rejected, (state) => {
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
export const selectProductImages = (state) => state.product.images;
export const selectSearchProducts = (state) => state.product.searchProduct;

export default productSlice.reducer;
