import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const loginAPI = import.meta.env.VITE_LOGIN_ENDPOINT;
const initialState = () => ({
  isLoggedIn: localStorage.getItem("token") != null,
  token: localStorage.getItem("token"),
  loading: false,
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
      return thunkAPI.rejectWithValue(
        error
      );
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
        state.error = "";
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
