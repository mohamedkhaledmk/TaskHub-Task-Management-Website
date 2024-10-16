import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const loginAPI = import.meta.env.VITE_LOGIN_ENDPOINT;
const initialState = () => ({
  isLoggedIn: localStorage.getItem("token") != null,
  token: localStorage.getItem("token"),
});

export const loginUser = createAsyncThunk("user/loginUser",async (userData,thunkAPI)=>{
  try{
    const res = await axios({
      method: "post",
      url: loginAPI,
      data: userData,
    });
    const data = res.data;
    return data;
  }catch(error){
    console.log("Error",error);
  }
})
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
  extraReducers: (builder)=>{
    builder.addCase(loginUser.pending , (state,action)=>{
      console.log(action);
    }).
    addCase(loginUser.fulfilled,(state,action)=>{
      const token = action.payload.token;
      localStorage.setItem("token", `Bearer ${token}`);
      state.isLoggedIn = true;
      state.token = token;
      console.log(action);
    }).
    addCase(loginUser.rejected , (state,action)=>{
      console.log(action);
    })
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
