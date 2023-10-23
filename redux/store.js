import { configureStore } from "@reduxjs/toolkit";
import adhanDataReducer from "./adhanDataSlice";

// Create a Redux store with adhanDataReducer as the reducer for the adhanData slice
export const store = configureStore({
  reducer: {
    // Register adhanDataReducer as the reducer for adhanData slice
    adhanData: adhanDataReducer,
  },
});
