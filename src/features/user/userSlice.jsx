import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchLoggedInUserOrders, { fetchLoggedInUser, fetchUserImage, fetchedAllUsers, updateAllUser, updateUser } from "./userAPI";


const initialState = {
  status: "idle",
  userInfo: null,
  allUsers:null,
  orders:[],
  images:null
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);
export const updateAlluserAsync = createAsyncThunk(
  "user/updateAllUser",
  async (AllUserUpdate) => {
    const response = await updateAllUser(AllUserUpdate);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);
export const fetchAllUserAsync = createAsyncThunk(
  "user/fetcheedAllUsers",
  async ({admin,role}) => {
    const response = await fetchedAllUsers(admin, role);
    return response.data;
  }
);
export const fetchUserImageAsync = createAsyncThunk(
  "user/fetchUserImage",
  async () => {
    const response = await fetchUserImage();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserImageAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      })
      .addCase(fetchAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = action.payload;
        state.filteredAdmins = state.allUsers.filter((admin) => admin.role === "admin");
      })
      .addCase(updateAlluserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAlluserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = action.payload;
        // state.filteredAdmins = action.payload.filteredAdmins;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;
export const selectUserImage = (state) => state.user.images;
export const selectAllUsers = (state) => state.user.allUsers;
export const selectfilterAdmins = (state) => state.user.filteredAdmins;

export default userSlice.reducer;
