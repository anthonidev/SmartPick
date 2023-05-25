import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IConfigState = {
  navigation: undefined,
  sidebar: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
    setNavigation: (state, action: PayloadAction<INavigation[]>) => {
      state.navigation = action.payload;
    },
  },
});

export const { setSidebar, setNavigation } = configSlice.actions;

export default configSlice.reducer;
