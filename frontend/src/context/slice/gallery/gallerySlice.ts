import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IGalleryState = {
  loading: false,
  image: null,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setLoadingGallery(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setImage(state, action: PayloadAction<IImage>) {
      state.image = action.payload;
    },
  },
});

export const { setLoadingGallery, setImage } = gallerySlice.actions;
export default gallerySlice.reducer;
