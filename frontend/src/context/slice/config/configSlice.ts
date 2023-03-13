import { getStoreLocal, setStoreLocal } from "@/lib/utils/localstore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IConfigState = {
  sidebar: false,
  aloneIcon: getStoreLocal("aloneIcon") === "true" ? true : false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebar = action.payload;
    },
    setAloneIcon(state, action: PayloadAction<boolean>) {
      state.aloneIcon = action.payload;
      setStoreLocal("aloneIcon", action.payload.toString());
    },
  },
});

export const { setSidebar, setAloneIcon } = configSlice.actions;

export default configSlice.reducer;
