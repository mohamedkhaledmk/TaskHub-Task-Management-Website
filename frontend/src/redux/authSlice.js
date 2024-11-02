import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const loginAPI = import.meta.env.VITE_LOGIN_ENDPOINT;
const usersAPI = import.meta.env.VITE_USERS_ENDPOINT;
const initialState = () => ({
  isLoggedIn: localStorage.getItem("token") != null,
  token: localStorage.getItem("token"),
  loading: false,
  users: [],
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios({
        method: "post",
        url: loginAPI,
        data: userData,
      });
      const data = res.data;
      console.log("Data Returned");
      return data;
    } catch (error) {
      console.log("ERROR FROM LOGIN USER : ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (token, thunkAPI) => {
    try {
      const users = await axios({
        method: "get",
        headers: {
          Authorization: token,
        },
        url: usersAPI,
      });
      console.log(users.data);
      return users.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login Successfully");
        const token = `Bearer ${action.payload.token}`;
        localStorage.setItem("token", token);
        state.isLoggedIn = true;
        state.token = token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log("Users Fetched Successfully");
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout, users } = authSlice.actions;
export default authSlice.reducer;
