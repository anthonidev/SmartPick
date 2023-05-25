import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./slice/gallery/gallerySlice";
import configReducer from "./slice/config/configSlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    config: configReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
