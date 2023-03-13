import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: INewsState = {
  carousel: null,
  loading: false,
  feeds: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCarousel: (state, action: PayloadAction<ICarousel[]>) => {
      state.carousel = action.payload;
    },
    setLoadingNews: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFeeds: (state, action: PayloadAction<IFeed[]>) => {
      state.feeds = action.payload;
    },
  },
});

export const { setCarousel, setLoadingNews, setFeeds } = newsSlice.actions;
export default newsSlice.reducer;
