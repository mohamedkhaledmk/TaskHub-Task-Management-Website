import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
export const store = configureStore({
  reducer: {
    user: authReducer,
    task: taskReducer,
  },
});
