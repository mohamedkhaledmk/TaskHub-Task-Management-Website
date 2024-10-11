import { configureStore } from "@reduxjs/toolkit";
import { testState } from "./slices/testSlice";

const store = configureStore({
  reducer: {
    testState,
  },
});

export default store;
