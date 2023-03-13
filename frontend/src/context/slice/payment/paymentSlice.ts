import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IPaymentState = {
  pricings: null,
  loading: false,
  card: null,
  suscription: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPricings: (state, action: PayloadAction<IPricing[] | null>) => {
      state.pricings = action.payload;
    },

    setLoadingPayment: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearStatePayment: (state) => {
      state.pricings = null;
    },
    setCard: (state, action: PayloadAction<ICreditCard | null>) => {
      state.card = action.payload;
    },
    setSuscriptionUser: (
      state,
      action: PayloadAction<ISuscriptionUser | null>
    ) => {
      state.suscription = action.payload;
    },
  },
});

export const {
  setPricings,
  setLoadingPayment,
  clearStatePayment,
  setCard,
  setSuscriptionUser,
} = paymentSlice.actions;

export default paymentSlice.reducer;
