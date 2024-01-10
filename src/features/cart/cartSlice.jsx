import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFormCart, fetchItemsByUserId, resetCart, updateCart } from "./cartAPI";


const initialState = {
  status:'idle',
  items: []
}

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFormCartAsync = createAsyncThunk(
  'cart/deleteItemFormCart',
  async (itemId) => {
    const response = await deleteItemFormCart(itemId);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items.push(action.payload);
    })
    .addCase(addToCartAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error
    })
    .addCase(fetchItemsByUserIdAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload;
    })
    .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error
    })
    .addCase(updateItemAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateItemAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.items.findIndex(item=>item.id===action.payload.id)
      state.items[index] = action.payload;
    })
    .addCase(updateItemAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error
    })
    .addCase(deleteItemFormCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteItemFormCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.items.findIndex(item=>item.id===action.payload)
      state.items.splice(index, 1);
    })
    .addCase(deleteItemFormCartAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error
    })
    .addCase(resetCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(resetCartAsync.fulfilled, (state) => {
      state.status = 'idle';
      state.items = []
    })
    .addCase(resetCartAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error
    })
  }
})


export const {increment} = counterSlice.actions;
export const selectItems = (state)=>state.cart.items;
export default counterSlice.reducer