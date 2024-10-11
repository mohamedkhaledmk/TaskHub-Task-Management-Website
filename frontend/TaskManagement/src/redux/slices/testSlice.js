import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: { test: 0 },
});

// reducer => export testSlice initialState
export const testState = testSlice.reducer;
