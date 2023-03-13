import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAccountState = {
  loading: false,
  account: null,
  suscription: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoadingAccount(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    loadAccount(state, action: PayloadAction<IAccount | null>) {
      state.account = action.payload;
    },

    setSuscription(state, action: PayloadAction<ISuscription | null>) {
      state.suscription = action.payload;
    },

    clearStateAccount(state) {
      state.account = null;
      state.loading = false;
      state.suscription = null;
    },
  },
});

export const {
  setLoadingAccount,
  loadAccount,
  setSuscription,
  clearStateAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
