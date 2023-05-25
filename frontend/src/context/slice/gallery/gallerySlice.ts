import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IGalleryState = {
  loading: false,
  image: null,
  gallery: null,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setLoadingGallery(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setImage(state, action: PayloadAction<IImage | null>) {
      state.image = action.payload;
    },
    setGallery(state, action: PayloadAction<IImage[]>) {
      state.gallery = action.payload;
    },
  },
});

export const { setLoadingGallery, setImage, setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
