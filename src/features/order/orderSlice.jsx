import { createOrder, fetchAllOrders, updateOrder, checkout, stripeCheckout, razorCheckout } from "./orderAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOrder: null,
  orders: [],
  status: "idle",
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders( sort, pagination );
    return response.data;
  }
);

export const checkoutAsync = createAsyncThunk(
  "order/checkout",
  async (totalAmount) => {
    const response = await checkout(totalAmount);
    return response.data;
  }
);
export const stripeCheckoutAsync = createAsyncThunk(
  "order/stripeCheckout",
  async (currentOrder) => {
    const response = await stripeCheckout(currentOrder);
    return response.data;
  }
);
export const razorCheckoutAsync = createAsyncThunk(
  "order/razorCheckout",
  async (currentOrder) => {
    const response = await razorCheckout(currentOrder);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(checkoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalAmount = action.payload
      })
      .addCase(checkoutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(stripeCheckoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(stripeCheckoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload
      })
      .addCase(stripeCheckoutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(razorCheckoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(razorCheckoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload
      })
      .addCase(razorCheckoutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
